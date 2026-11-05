const http = require('node:http');
const { createHmac, timingSafeEqual } = require('node:crypto');

function createServer({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
  const mock = env.USE_MOCK_DATA === undefined || env.USE_MOCK_DATA === 'true';
  if (!mock && env.USE_MOCK_DATA !== 'false') throw new Error('USE_MOCK_DATA must be true or false');
  if (!mock && (!env.HUBSPOT_CLIENT_SECRET || !env.HUBSPOT_ACCESS_TOKEN ||
      !/^\d+$/.test(env.HUBSPOT_PORTAL_ID || '') || !/^\d+$/.test(env.HUBSPOT_APP_ID || '') ||
      !/^\d+(,\d+)*$/.test(env.AUTHORIZED_USER_IDS || ''))) {
    throw new Error('Live mode requires server credentials, exact app/account identity and approved users');
  }
  const origin = env.PUBLIC_ORIGIN || 'https://your-host.example.com';
  if (new URL(origin).origin !== origin || !origin.startsWith('https://')) throw new Error('PUBLIC_ORIGIN must be an HTTPS origin without a path');
  const version = env.HUBSPOT_API_VERSION || '2026-09';
  if (!/^\d{4}-\d{2}$/.test(version)) throw new Error('Invalid API version');
  return http.createServer(async (request, response) => {
    const send = (status, body) => {
      response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
      response.end(JSON.stringify(body));
    };
    try {
      const url = new URL(request.url, origin);
      if (request.method === 'GET' && url.pathname === '/') return send(200, { ok: true, mock });
      if (request.method !== 'POST' || url.pathname !== '/api/contact-brief') return send(404, { error: 'Not found' });
      const chunks = [];
      let bytes = 0;
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 8192) return send(413, { error: 'Request too large' });
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf8');
      // Use the configured public origin, never untrusted Host/Forwarded headers.
      if (!mock && !validSignature(request, raw, origin, env.HUBSPOT_CLIENT_SECRET, now())) return send(401, { error: 'Unauthorized' });
      if (!mock && (!single(url, 'portalId', env.HUBSPOT_PORTAL_ID) || !single(url, 'appId', env.HUBSPOT_APP_ID) ||
          url.searchParams.getAll('userId').length !== 1 || !env.AUTHORIZED_USER_IDS.split(',').includes(url.searchParams.get('userId')))) {
        return send(403, { error: 'Account, app or user not authorized' });
      }
      if (String(request.headers['content-type']).split(';')[0] !== 'application/json') return send(415, { error: 'Expected application/json' });
      let payload;
      try { payload = JSON.parse(raw); } catch { return send(400, { error: 'Invalid JSON' }); }
      const input = payload?.inputFields || payload;
      const contactId = input?.contactId;
      if (typeof contactId !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(contactId) || (!mock && !/^\d+$/.test(contactId))) {
        return send(400, { error: 'Valid contactId is required' });
      }
      let brief = `Sample contact brief for ${contactId}.`;
      if (!mock) {
        const api = new URL(`https://api.hubapi.com/crm/objects/${version}/contacts/${contactId}`);
        api.searchParams.set('properties', 'firstname,lastname,company,lifecyclestage');
        const result = await fetchImpl(api, { redirect: 'error', headers: { authorization: `Bearer ${env.HUBSPOT_ACCESS_TOKEN}` }, signal: AbortSignal.timeout(10000) });
        if (result.status === 404) return send(200, { hs_execution_state: 'SUCCESS', outputFields: { status: 'empty', brief: '', nextStep: '' } });
        if (!result.ok) return send(502, { error: 'Contact lookup unavailable' });
        const p = (await result.json()).properties || {};
        brief = `${[p.firstname, p.lastname].filter(Boolean).join(' ') || 'Contact'} at ${p.company || 'unknown company'}: ${p.lifecyclestage || 'unknown stage'}.`;
      }
      return send(200, { hs_execution_state: 'SUCCESS', outputFields: { brief, nextStep: 'Review the record before following up.', status: mock ? 'sample' : 'live' } });
    } catch { return send(500, { error: 'Unable to load contact brief' }); }
  });
}

function single(url, key, expected) {
  return url.searchParams.getAll(key).length === 1 && url.searchParams.get(key) === expected;
}

function validSignature(request, rawBody, origin, secret, now) {
  const timestamp = request.headers['x-hubspot-request-timestamp'];
  const signature = request.headers['x-hubspot-signature-v3'];
  if (typeof timestamp !== 'string' || !/^\d{13}$/.test(timestamp) || Math.abs(now - Number(timestamp)) > 300000 || typeof signature !== 'string') return false;
  const uri = origin + request.url;
  const q = uri.indexOf('?');
  const decode = { '3A': ':', '2F': '/', '3F': '?', '40': '@', '21': '!', '24': '$', '27': "'", '28': '(', '29': ')', '2A': '*', '2C': ',', '3B': ';' };
  const canonical = q < 0 ? uri : uri.slice(0, q + 1) + uri.slice(q + 1).replace(/%(3A|2F|3F|40|21|24|27|28|29|2A|2C|3B)/gi, (_, hex) => decode[hex.toUpperCase()]);
  const expected = createHmac('sha256', secret).update(request.method + canonical + rawBody + timestamp).digest('base64');
  const a = Buffer.from(signature), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function startServer(port = Number(process.env.PORT || 3000)) {
  return createServer().listen(port, '127.0.0.1');
}
if (require.main === module) startServer();
module.exports = { createServer, startServer, validSignature };
