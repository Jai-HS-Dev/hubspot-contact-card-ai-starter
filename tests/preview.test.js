const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const { loadSampleBrief, render } = require('../scripts/preview-card.js');

test('preview renders the made-up sample and says it is not HubSpot', async () => {
  const before = process.env.USE_MOCK_DATA;
  process.env.USE_MOCK_DATA = 'false'; // The preview must still use made-up data.
  try {
    const html = render(await loadSampleBrief());
    assert.ok(html.includes('Sample contact brief for sample-1.'));
    assert.ok(html.includes('Status: sample'));
    assert.match(html, /Preview with made-up data/);
    assert.match(html, /not HubSpot/);
  } finally {
    if (before === undefined) delete process.env.USE_MOCK_DATA; else process.env.USE_MOCK_DATA = before;
  }
});

test('preview escapes text and contains no scripts or remote resources', () => {
  const html = render({ brief: '<script>alert(1)</script>', nextStep: '"quoted" & more', status: 'sample' });
  assert.ok(!html.includes('<script'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('&quot;quoted&quot; &amp; more'));
  assert.ok(!/https?:\/\//.test(html), 'The preview page must not load anything from the network');
});

test('preview output stays out of Git and has a documented command', () => {
  assert.ok(fs.readFileSync(path.join(root, '.gitignore'), 'utf8').split(/\r?\n/).includes('preview/'));
  assert.equal(require('../package.json').scripts.preview, 'node scripts/preview-card.js');
  assert.ok(fs.readFileSync(path.join(root, 'README.md'), 'utf8').includes('npm run preview'));
});
