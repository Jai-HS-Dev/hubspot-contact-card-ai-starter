# Recipe: Next Best Action Card

Build a card that recommends one useful next step for the current contact.

## Good First Version

Help a sales rep decide what to do before contacting a lead. Start with the
[Contact Brief example](../../examples/contact-card-with-agent-tool/README.md):
it shows a made-up lifecycle stage and one suggested next step. It does not
create a task, send a message, or read a CRM record in mock mode.

From the repository root, run `npm run preview` and open the file it names.
Look for `Lifecycle stage: Lead (sample).`, the suggestion to confirm what the
lead needs, and `Status: sample`. Use `npm.cmd` in Windows PowerShell. No HubSpot
account, packages, or credentials are required for this preview.

To make it yours, choose one different follow-up suggestion. Update the mock
suggestion in `examples/contact-card-with-agent-tool/server.js` and the matching
assertions in `tests/backend.test.js` and `tests/preview.test.js`. Run
`npm run test:core` and regenerate the preview. Keep the stage marked as sample
and confirm no task was created. The tests also check that the sample brief
matches the requested contact ID.

For a separate [developer-account trial](../../docs/first-live-test.md), use one
synthetic contact and compare the brief's ID to the open record. The trial does
not establish real CRM reads, record-level authorization, or production readiness.

## Possible Next Design

This is an illustrative shape for a more advanced card, not the sample endpoint's
response and not an action to run.

```json
{
  "state": "success",
  "action": "Create a follow-up task",
  "reason": "The contact has recent interest but no upcoming task.",
  "risk": "low"
}
```

## Prompt

```text
Use the next best action card recipe. Show me the local sample, then help me
change one suggested next step. Keep it read-only. Don't connect HubSpot,
change permissions, or add an action that writes to CRM.
```
