# First Test Inside HubSpot

> **Status:** written 2026-11-10 from HubSpot's official documentation. The
> maintainer has **not yet run these steps end to end**. Use them as a checklist
> to confirm, not as a guarantee, and record what really happened.

## What This Is

The made-up data demo on your computer proves nothing about HubSpot. This is the
smallest real test: the sample card showing made-up data on one test contact, in
a free developer test account. It reads nothing sensitive and writes nothing.
It is optional. You can learn a lot and stop before this step.

## Before You Start

- [ ] You finished [the walkthrough](start-here.md) and the mock example passed.
- [ ] You have a developer test account that holds no real customer data. See
      [choosing where to test](connect-to-hubspot.md).
- [ ] The account owner approves setting up HubSpot's CLI, installing the
      reviewed project dependencies, signing in, and uploading and installing
      a new test app in the named developer test account. Review CLI prompts;
      stop if any action would touch a different account or an existing app.

If any box is unchecked, stop here. Nothing is wrong; you are simply not ready.

## Steps

1. **Set up HubSpot's official tools.** Follow HubSpot's
   [command-line install guide](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/install-the-cli),
   or the [Build with AI quickstart](https://developers.hubspot.com/docs/build-with-ai/quickstart)
   if you work with an AI assistant. Sign-in happens in your browser. Never paste
   a key or password into an AI chat. Before continuing, confirm that the account
   the tool selected is your test account.
2. **Make a new learning app.** Use [HubSpot's project templates](https://github.com/HubSpot/hubspot-project-components)
   to scaffold a new private, static-auth app and a Contacts card. Keep the
   generated app identity and card metadata, including the Contacts object type.
   In the card folder, use the example's `ContactBriefView.js` and its
   `ContactBriefCard.jsx` entry point (update the card's entry point to match).
   Do not copy the starter's illustrative OAuth app metadata or request
   additional CRM permissions just to render the sample.
3. **Map the card to your computer.** In the new app's card entry point set the
   endpoint to `https://contact-brief.example.com/api/contact-brief`, and allow
   that endpoint in the app's `permittedUrls.fetch`. This is a reserved example
   address, not a service to set up or contact. Follow
   [HubSpot's local proxy guide](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/fetching-data#proxying-requests-to-a-locally-running-backend).
   Put `local.json` beside the new app metadata in the app directory:

   ```json
   {
     "proxy": {
       "https://contact-brief.example.com": "http://127.0.0.1:3000"
     }
   }
   ```

   The mapping uses an origin, not the `/api/contact-brief` path. Keep the file
   local; the mapping only works when the development server is active.
4. **Start the sample backend.** From
   [the example folder](../examples/contact-card-with-agent-tool/README.md),
   run `node server.js` in a terminal with `USE_MOCK_DATA=true` and no real
   credentials. In PowerShell, set it with `$env:USE_MOCK_DATA = 'true'`; in a
   POSIX shell use `USE_MOCK_DATA=true node server.js`. Check
   `http://127.0.0.1:3000/` for `"mock":true` before opening a record.
5. **Validate and run the card in the test account.** In a second terminal, at
   the root of the new project, run `hs project validate`, then, with approval,
   `hs project upload` and install the learning app in the selected test
   account. Run `hs project dev`. Before opening a contact, confirm the CLI
   detected the proxy. If the CLI does not detect it, stop and check the
   metadata location and origin; do not add a tunnel or disable validation.
6. **Open one made-up contact in the test account.** Look for the local
   development indicator, a remapped request in the CLI, and `Status: sample`
   on the card. Compare the ID in the made-up brief with the open test record
   privately. Record the result without copying the ID or sharing a screenshot.

## Record The Result

Keep the full note private. Add only a short, cleaned-up summary to
[EVIDENCE.md](EVIDENCE.md).

```text
Date:
Tested by (role, not a name):
Account type: developer test account
Platform version in hsproject.json:
Tool versions (Node.js, HubSpot command-line tool):
Validation result:
What I saw on the test contact:
What I had to change to make it work:
Not tested:
```

Leave out account IDs, people's names, keys, and screenshots of real records.

## If Something Fails

Stop and read [troubleshooting](troubleshooting.md). Do not switch off signature
checks, ask for wider permissions, or move to your everyday business account to
get past an error. HubSpot's guide on
[managing your project](https://developers.hubspot.com/docs/build-with-ai/best-practices/managing-your-project)
covers validation and going back to an earlier build.

## What This Does Not Prove

A working card in this local proxy trial proves the UI and routing, not
signature validation, CRM access, or record-level authorization. Mock mode is
for made-up data on loopback only. A real backend needs its own authorization
and hosting review. Before real use, go through the
[live-use checklist](REAL_TOOL_CHECKLIST.md) and
[implementation responsibility](implementation-responsibility.md).
