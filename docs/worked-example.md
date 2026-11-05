# Worked Exercise: Make The Card's Data Mode Clear

**Scope:** Synthetic UI/backend tests, not a HubSpot installation.
You will customize one visible label while retaining loading, empty and error states.

## 1. Choose The Check You Need

The first backend demo remains package-free:

```bash
npm run smoke:example
npm run test:core
```

Full UI testing needs the existing reviewed card lockfile. After explicit approval
to install those dependencies, run from the repository root:

```bash
npm ci --prefix examples/contact-card-with-agent-tool/src/app/cards --ignore-scripts --no-audit --no-fund
npm run example:guided
```

Use `npm.cmd` in Windows PowerShell. Do not run npm ci in the repository root.
The full command `npm test` checks for the required UI setup and fails with
instructions if packages are absent; it never silently skips or installs them.

The synthetic renderer checks setup, loading, success/refresh, empty results,
permission errors and a signed backend round trip. No HubSpot data is read.

## 2. Customize The Label In Your Copy

The sample response already includes `status: "sample"`; the UI shows:

```text
Status: sample
```

In `tests/card-ui.test.js`, change the assertion expecting `Status: sample`
to expect `Data mode: sample`. Run `npm run example:guided`: that check should
fail until the implementation matches.

In `examples/contact-card-with-agent-tool/src/app/cards/ContactBriefView.js`,
change only the rendered label `"Status: "` to `"Data mode: "`.
Keep the actual status value, setup gate, response checks and error behavior.

Run `npm run example:guided`, then `npm test`; both should pass after setup.
This proves synthetic rendering, not a cloud build or installed card.

## 3. Recognize Failure As Well As Success

| Scenario | Expected UI |
| --- | --- |
| Placeholder endpoint | Setup required; no request |
| Pending response | Loading brief... |
| Valid sample | Brief, next step and Data mode: sample |
| Empty result | No contact data available. |
| Denied or failed request | Unable to load this contact... |

These are expected synthetic states, not screenshots of a verified HubSpot install.
The label must not imply that sample data is real CRM data.

## 4. Plan Your Real Card

Use [the blueprint](contact-card-blueprint.md) to name a user goal, fields,
read/write permissions, UI states and an acceptance check. Follow
[the connection guide](connect-to-hubspot.md) before an approved developer-account
trial. Keep secrets server-side and verify user/record authorization separately.

The illustrative basic-serverless folder has no installable package. Start with
the reviewed [Contact Brief setup](../examples/contact-card-with-agent-tool/README.md)
rather than trying to deploy that illustration.
