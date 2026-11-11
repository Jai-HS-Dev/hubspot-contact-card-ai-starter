const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../examples/contact-card-with-agent-tool');
test('card scaffold uses the reviewed project, app and card fields', () => {
  const project = JSON.parse(fs.readFileSync(path.join(root, 'hsproject.json')));
  assert.equal(project.platformVersion, '2026.09');
  assert.equal(project.srcDir, './src');
  const app = JSON.parse(fs.readFileSync(path.join(root, 'src/app/app-hsmeta.json')));
  assert.equal(app.type, 'app');
  assert.equal(app.config.distribution, 'private');
  assert.deepEqual(app.config.auth.requiredScopes, ['oauth', 'crm.objects.contacts.read']);
  assert.deepEqual(Object.keys(app.config.permittedUrls).sort(), ['fetch', 'iframe', 'img']);
  const card = JSON.parse(fs.readFileSync(path.join(root, 'src/app/cards/contact-brief-card-hsmeta.json')));
  assert.equal(card.type, 'card');
  assert.deepEqual(card.config.objectTypes, ['CONTACT']);
  assert.ok(fs.existsSync(path.join(root, 'src', card.config.entrypoint)));
  const actions = path.join(root, 'src/app/workflow-actions');
  assert.ok(!fs.existsSync(actions) || !fs.readdirSync(actions).some(file => file.endsWith('-hsmeta.json')));
});

test('checklist card uses the sample file without a backend or write scopes', () => {
  const folder = path.resolve(__dirname, '../examples/follow-up-checklist-card');
  const read = file => fs.readFileSync(path.join(folder, file), 'utf8');
  const app = JSON.parse(read('src/app/app-hsmeta.json'));
  const card = JSON.parse(read('src/app/cards/follow-up-checklist-hsmeta.json'));
  const component = read('src' + card.config.entrypoint);
  assert.equal(app.config.distribution, 'private');
  assert.deepEqual(app.config.auth.requiredScopes, ['oauth', 'crm.objects.contacts.read']);
  assert.deepEqual(app.config.permittedUrls, { fetch: [], iframe: [], img: [] });
  assert.deepEqual(card.config.objectTypes, ['contacts']);
  assert.match(component, /from '\.\/checklist\.mjs'/);
  assert.doesNotMatch(component, /\bfetch\s*\(/);
  const output = execFileSync(process.execPath, ['preview.mjs'], { cwd: folder, encoding: 'utf8' });
  assert.match(output, /2\. Agree on the next meeting date\./);
});
