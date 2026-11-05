const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const dir = path.resolve(__dirname, '../examples/contact-card-with-agent-tool/src/app/cards');
const load = relative => import(pathToFileURL(path.join(dir, relative)).href);
test('actual React view renders with the HubSpot SDK test renderer', async t => {
  const React = (await load('node_modules/react/index.js')).default;
  const { createRenderer } = await load('node_modules/@hubspot/ui-extensions/dist/testing/index.js');
  const { Text, Button, hubspot } = await load('node_modules/@hubspot/ui-extensions/dist/index.js');
  const { ContactBriefCard } = await load('ContactBriefView.js');
  const original = hubspot.fetch;
  t.after(() => { hubspot.fetch = original; });
  const text = renderer => renderer.findAll(Text).map(node => node.text).join(' ');
  await t.test('placeholder endpoint does not send a request', () => {
    hubspot.fetch = () => { throw new Error('Setup should not fetch'); };
    const r = createRenderer('crm.record.tab');
    r.render(React.createElement(ContactBriefCard, { context: { crm: { objectId: 333 } } }));
    assert.match(text(r), /Setup required/); assert.equal(r.find(Button).props.disabled, true);
  });
  await t.test('loading, success and refresh', async () => {
    let resolve, calls = 0;
    hubspot.fetch = () => { calls++; return new Promise(done => { resolve = done; }); };
    const r = createRenderer('crm.record.tab');
    r.render(React.createElement(ContactBriefCard, { context: { crm: { objectId: 333 } }, endpoint: 'https://api.example.com/api/contact-brief' }));
    await r.waitFor(() => assert.match(text(r), /Loading/));
    assert.equal(r.find(Button).props.disabled, true);
    resolve(Response.json({ hs_execution_state: 'SUCCESS', outputFields: { brief: 'Synthetic contact', nextStep: 'Review', status: 'sample' } }));
    await r.waitFor(() => assert.match(text(r), /Synthetic contact/));
    r.find(Button).props.onClick();
    await r.waitFor(() => assert.equal(calls, 2));
    resolve(Response.json({ hs_execution_state: 'SUCCESS', outputFields: { brief: '', nextStep: '', status: 'empty' } }));
    await r.waitFor(() => assert.match(text(r), /No contact data/));
  });
  await t.test('permission errors and invalid responses never render success', async () => {
    for (const response of [new Response('{}', { status: 403 }), Response.json({ hs_execution_state: 'FAIL_CONTINUE' })]) {
      hubspot.fetch = async () => response;
      const r = createRenderer('crm.record.tab');
      r.render(React.createElement(ContactBriefCard, { context: { crm: { objectId: 333 } }, endpoint: 'https://api.example.com/api/contact-brief' }));
      await r.waitFor(() => assert.match(text(r), /Unable to load/));
    }
  });
  await t.test('React card through signed backend to synthetic CRM and back', async () => {
    const { once } = require('node:events');
    const { createHmac } = require('node:crypto');
    const { createServer } = require('../examples/contact-card-with-agent-tool/server');
    const env = { USE_MOCK_DATA: 'false', HUBSPOT_CLIENT_SECRET: 'synthetic-signing-secret', HUBSPOT_ACCESS_TOKEN: 'synthetic-access', HUBSPOT_PORTAL_ID: '12345', HUBSPOT_APP_ID: '67890', AUTHORIZED_USER_IDS: '111', PUBLIC_ORIGIN: 'https://api.example.com' };
    let lookups = 0;
    const server = createServer({ env, fetchImpl: async url => {
      assert.equal(url.pathname, '/crm/objects/2026-09/contacts/333'); lookups++;
      return Response.json({ properties: { firstname: 'Synthetic', lastname: 'EndToEnd', company: 'Example' } });
    } });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    try {
      // Test double for HubSpot's data fetch service, NOT browser authentication code.
      hubspot.fetch = (endpoint, options) => {
        const path = new URL(endpoint).pathname + '?portalId=12345&appId=67890&userId=111';
        const raw = JSON.stringify(options.body), timestamp = String(Date.now());
        const signature = createHmac('sha256', env.HUBSPOT_CLIENT_SECRET).update('POST' + env.PUBLIC_ORIGIN + path + raw + timestamp).digest('base64');
        return fetch('http://127.0.0.1:' + server.address().port + path, { method: options.method, body: raw, headers: { 'content-type': 'application/json', 'x-hubspot-signature-v3': signature, 'x-hubspot-request-timestamp': timestamp } });
      };
      const r = createRenderer('crm.record.tab');
      r.render(React.createElement(ContactBriefCard, { context: { crm: { objectId: 333 } }, endpoint: env.PUBLIC_ORIGIN + '/api/contact-brief' }));
      await r.waitFor(() => assert.match(text(r), /Synthetic EndToEnd/));
      assert.equal(lookups, 1);
    } finally { await new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }); }
  });
});
