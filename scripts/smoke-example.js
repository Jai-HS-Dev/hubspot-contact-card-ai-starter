const path = require('node:path');
const { once } = require('node:events');

const repoType = process.env.SMOKE_REPO_TYPE || inferRepoType();
const config = getConfig(repoType);
const exampleDir = path.join(process.cwd(), config.exampleDir);

main().catch((error) => {
  console.error(`Smoke check failed: ${error.message}`);
  process.exit(1);
});

async function main() {
  process.env.USE_MOCK_DATA = 'true';
  const { startServer } = require(path.join(exampleDir, 'server.js'));
  const server = startServer(0);

  try {
    await once(server, 'listening');
    const baseUrl = 'http://127.0.0.1:' + server.address().port;
    const health = await fetch(baseUrl + '/', { signal: AbortSignal.timeout(5000) });
    assert(health.ok, 'root route should return 200');
    await config.assert(baseUrl);
    console.log(`${repoType} smoke example passed.`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
}

function getConfig(type) {
  if (type === 'oauth') {
    return {
      exampleDir: 'examples/minimal-oauth-service',
      assert: async (baseUrl) => {
        const response = await fetch(`${baseUrl}/`);
        const body = await response.json();
        assert(response.ok, 'root route should return 200');
        assert(Array.isArray(body.routes), 'root route should list routes');
      }
    };
  }

  if (type === 'agent') {
    return {
      exampleDir: 'examples/simple-contact-brief-agent-tool',
      assert: async (baseUrl) => {
        const response = await fetch(`${baseUrl}/api/contact-brief`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ inputFields: { contactId: 'sample-1', briefType: 'sales' } })
        });
        const body = await response.json();
        assert(response.ok, 'contact brief route should return 200');
        assert(body.hs_execution_state === 'SUCCESS', 'response should report SUCCESS');
        assert(body.outputFields && body.outputFields.brief, 'response should include outputFields.brief');
      }
    };
  }

  if (type === 'card') {
    return {
      exampleDir: 'examples/contact-card-with-agent-tool',
      assert: async (baseUrl) => {
        const response = await fetch(`${baseUrl}/api/contact-brief`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ inputFields: { contactId: 'sample-1' } })
        });
        const body = await response.json();
        assert(response.ok, 'contact card backend route should return 200');
        assert(body.hs_execution_state === 'SUCCESS', 'response should report SUCCESS');
        assert(body.outputFields && body.outputFields.brief, 'response should include outputFields.brief');
      }
    };
  }

  throw new Error(`Unknown SMOKE_REPO_TYPE: ${type}`);
}

function inferRepoType() {
  const cwd = process.cwd().toLowerCase();
  if (cwd.includes('oauth')) return 'oauth';
  if (cwd.includes('contact-card')) return 'card';
  return 'agent';
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
