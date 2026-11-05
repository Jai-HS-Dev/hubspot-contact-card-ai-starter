const fs = require('node:fs');
const path = require('node:path');
const dir = path.resolve(__dirname, '../examples/contact-card-with-agent-tool/src/app/cards');
const expected = require(path.join(dir, 'package.json')).dependencies;
const entries = { react: 'index.js', '@hubspot/ui-extensions': 'dist/testing/index.js' };
let ready = true;
for (const [name, entry] of Object.entries(entries)) {
  try {
    const installed = JSON.parse(fs.readFileSync(path.join(dir, 'node_modules', name, 'package.json'), 'utf8'));
    if (installed.version !== expected[name] || !fs.existsSync(path.join(dir, 'node_modules', name, entry))) ready = false;
  } catch { ready = false; }
}
if (!ready) {
  console.error('Full UI tests need the reviewed optional card packages. Nothing was installed automatically.');
  console.error('For package-free backend checks: npm run test:core');
  console.error('After reviewing and approving dependencies, from the repository root run:');
  console.error('npm ci --prefix examples/contact-card-with-agent-tool/src/app/cards --ignore-scripts --no-audit --no-fund');
  console.error('Then run npm test. In Windows PowerShell, use npm.cmd instead of npm.');
  process.exitCode = 1;
}
