const http = require('node:http');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT || 3000);

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/') {
      return sendJson(response, 200, {
        ok: true,
        routes: ['POST /api/contact-brief']
      });
    }

    if (request.method !== 'POST' || request.url !== '/api/contact-brief') {
      return sendJson(response, 404, { error: 'Not found' });
    }

    if (!isAuthorized(request)) {
      return sendJson(response, 401, { error: 'Unauthorized' });
    }

    const payload = await readJson(request);
    const inputFields = payload.inputFields || payload;
    const contactId = String(inputFields.contactId || '').trim();

    if (!contactId) {
      return sendJson(response, 400, {
        hs_execution_state: 'FAIL_CONTINUE',
        outputFields: {
          brief: '',
          nextStep: '',
          status: 'missing_contact_id'
        }
      });
    }

    return sendJson(response, 200, {
      hs_execution_state: 'SUCCESS',
      outputFields: {
        brief: `Sample contact brief for ${contactId}. Replace mock data with OAuth-backed HubSpot lookup when ready.`,
        nextStep: 'Send a short personalized follow-up.',
        status: 'sample'
      }
    });
  } catch (error) {
    console.error('contact brief backend failed:', error.message);
    return sendJson(response, 500, {
      hs_execution_state: 'FAIL_CONTINUE',
      outputFields: {
        brief: '',
        nextStep: '',
        status: 'error'
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Contact card backend listening on http://localhost:${PORT}`);
});

function isAuthorized(request) {
  const expected = String(process.env.CONTACT_BRIEF_SHARED_SECRET || '').trim();
  if (!expected) return true;
  const provided = String(request.headers['x-contact-brief-secret'] || '').trim();
  if (!provided) return false;

  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  response.end(JSON.stringify(body, null, 2));
}

