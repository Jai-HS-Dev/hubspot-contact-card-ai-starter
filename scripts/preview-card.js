// Writes a local HTML sketch of the sample card, using the mock backend's answer.
// No packages, no HubSpot account, no credentials. Requests stay on 127.0.0.1.
// This is a learning aid: it is not the HubSpot UI and it installs nothing.
const fs = require('node:fs');
const path = require('node:path');
const { once } = require('node:events');

const root = path.resolve(__dirname, '..');
const exampleDir = path.join(root, 'examples/contact-card-with-agent-tool');
const outFile = path.join(root, 'preview', 'contact-card-preview.html');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

async function loadSampleBrief() {
  const { createServer } = require(path.join(exampleDir, 'server.js'));
  // Force made-up data, whatever the caller's environment or .env file says.
  const server = createServer({ env: { USE_MOCK_DATA: 'true' } }).listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/api/contact-brief', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ inputFields: { contactId: 'sample-1' } }),
      signal: AbortSignal.timeout(5000)
    });
    const payload = await response.json();
    if (!response.ok || payload.hs_execution_state !== 'SUCCESS' || !payload.outputFields) {
      throw new Error('The mock backend did not return a sample brief.');
    }
    const { brief, nextStep, status } = payload.outputFields;
    if (status !== 'sample') throw new Error('Preview only renders made-up sample data.');
    return { brief, nextStep, status };
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

function render({ brief, nextStep, status }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sample card preview (made-up data)</title>
<style>
  body { font-family: system-ui, sans-serif; background: #f5f8fa; color: #33475b; margin: 0; padding: 24px; }
  .notice { max-width: 560px; margin: 0 auto 16px; padding: 12px 16px; background: #fff8e1; border: 1px solid #f5c26b; border-radius: 4px; }
  .card { max-width: 560px; margin: 0 auto; padding: 20px; background: #fff; border: 1px solid #cbd6e2; border-radius: 4px; }
  h1 { font-size: 16px; margin: 0 0 12px; }
  button { padding: 8px 16px; border: 1px solid #cbd6e2; border-radius: 3px; background: #eaf0f6; color: #7c98b6; }
  hr { border: 0; border-top: 1px solid #cbd6e2; margin: 16px 0; }
  p { margin: 8px 0; }
  footer { max-width: 560px; margin: 16px auto 0; font-size: 13px; color: #516f90; }
</style>
</head>
<body>
<div class="notice"><strong>Preview with made-up data.</strong> This page was written by a program on your computer. It is not HubSpot, no card is installed, and no real contact was read.</div>
<div class="card">
  <h1>Contact Brief</h1>
  <button type="button" disabled>Refresh</button>
  <hr>
  <p>${escapeHtml(brief)}</p>
  <p>Next step: ${escapeHtml(nextStep)}</p>
  <p>Status: ${escapeHtml(status)}</p>
</div>
<footer>A simple sketch of the text the sample card shows. The real card code is in examples/contact-card-with-agent-tool/src/app/cards/ContactBriefView.js and will look different inside HubSpot.</footer>
</body>
</html>
`;
}

async function main() {
  const html = render(await loadSampleBrief());
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log('Preview written with made-up data. Open this file in your browser:');
  console.log(outFile);
  console.log('Nothing was sent to HubSpot and no card was installed.');
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Preview failed: ' + error.message);
    process.exitCode = 1;
  });
}

module.exports = { escapeHtml, loadSampleBrief, render };
