const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { createHmac } = require('node:crypto');
const { createServer } = require('../examples/contact-card-with-agent-tool/server');

const env = {
  USE_MOCK_DATA: 'false', HUBSPOT_CLIENT_SECRET: 'synthetic-client-secret',
  HUBSPOT_ACCESS_TOKEN: 'synthetic-access', HUBSPOT_PORTAL_ID: '12345',
  HUBSPOT_APP_ID: '67890', AUTHORIZED_USER_IDS: '111,222', PUBLIC_ORIGIN: 'https://api.example.com'
};
const now = 1700000000000;
const body = JSON.stringify({ inputFields: { contactId: '333' } });
const route = '/api/contact-brief?portalId=12345&appId=67890&userId=111';
function signed(path = route, raw = body, timestamp = now) {
  const canonical = env.PUBLIC_ORIGIN + path.replace('%40', '@');
  return {
    'content-type': 'application/json',
    'x-hubspot-request-timestamp': String(timestamp),
    'x-hubspot-signature-v3': createHmac('sha256', env.HUBSPOT_CLIENT_SECRET).update('POST' + canonical + raw + timestamp).digest('base64')
  };
}
test('card backend security and CRM contract', async t => {
  let calls = 0, status = 200;
  const server = createServer({ env, now: () => now, fetchImpl: async (url, options) => {
    calls++;
    assert.equal(url.origin, 'https://api.hubapi.com');
    assert.equal(url.pathname, '/crm/objects/2026-09/contacts/333');
    assert.equal(options.headers.authorization, 'Bearer synthetic-access');
    return new Response(JSON.stringify({ properties: { firstname: 'Synthetic', lastname: 'Contact', company: 'Example', lifecyclestage: 'lead' } }), { status });
  } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = 'http://127.0.0.1:' + server.address().port;
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const post = (path = route, raw = body, headers = signed(path, raw)) => fetch(base + path, { method: 'POST', headers, body: raw });
  await t.test('unsigned requests cannot reach CRM', async () => {
    assert.equal((await post(route, body, { 'content-type': 'application/json' })).status, 401); assert.equal(calls, 0);
  });
  await t.test('wrong account, app, user and duplicate identity rejected', async () => {
    for (const path of [route.replace('12345', '999'), route.replace('67890', '999'), route.replace('111', '999'), route + '&portalId=12345']) assert.equal((await post(path)).status, 403);
    assert.equal(calls, 0);
  });
  await t.test('stale and future timestamps rejected', async () => {
    for (const timestamp of [now - 300001, now + 300001]) assert.equal((await post(route, body, signed(route, body, timestamp))).status, 401);
  });
  await t.test('modified body rejected before lookup', async () => {
    assert.equal((await post(route, body + ' ', signed())).status, 401); assert.equal(calls, 0);
  });
  await t.test('signed lookup returns only display fields', async () => {
    const response = await post(); assert.equal(response.status, 200);
    const text = await response.text(); assert.match(text, /Synthetic Contact/); assert.ok(!text.includes(env.HUBSPOT_ACCESS_TOKEN));
    assert.equal(calls, 1);
  });
  await t.test('encoded query metadata matches documented canonicalization', async () => {
    assert.equal((await post(route + '&userEmail=sample%40example.com')).status, 200);
  });
  await t.test('body identity cannot override signed identity', async () => {
    assert.equal((await post(route.replace('12345', '999'), JSON.stringify({ portalId: '12345', inputFields: { contactId: '333' } }))).status, 403);
  });
  await t.test('missing, invalid and malformed inputs rejected', async () => {
    for (const raw of ['{}', 'null', '[1]', '{', '{"contactId":"../333"}']) assert.equal((await post(route, raw)).status, 400);
  });
  await t.test('oversized payload rejected', async () => { assert.equal((await post(route, 'x'.repeat(8193))).status, 413); });
  await t.test('unsupported media type rejected', async () => { assert.equal((await post(route, body, { ...signed(), 'content-type': 'text/plain' })).status, 415); });
  await t.test('CRM missing record is empty, not fabricated', async () => { status = 404; assert.equal((await (await post()).json()).outputFields.status, 'empty'); });
  await t.test('upstream failure is not success', async () => { status = 401; assert.equal((await post()).status, 502); });
});
test('live mode fails closed when configuration is absent', () => {
  assert.throws(() => createServer({ env: { USE_MOCK_DATA: 'false' } }), /Live mode requires/);
  assert.throws(() => createServer({ env: { USE_MOCK_DATA: 'FALSE' } }), /must be true or false/);
});

test('sample brief follows the requested contact and never reads CRM', async t => {
  let upstreamCalls = 0;
  const server = createServer({ env: {}, fetchImpl: async () => {
    upstreamCalls++;
    throw new Error('Mock mode must not call upstream');
  } });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  const url = 'http://127.0.0.1:' + server.address().port + '/api/contact-brief';

  for (const contactId of ['sample-1', 'sample-2']) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ inputFields: { contactId } })
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      hs_execution_state: 'SUCCESS',
      outputFields: {
        brief: `Sample contact brief for ${contactId}. Lifecycle stage: Lead (sample).`,
        nextStep: 'Confirm what the lead needs before following up.',
        status: 'sample'
      }
    });
  }
  assert.equal(upstreamCalls, 0);
});
