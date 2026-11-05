# Basic Contact Card With Serverless Function

**Example status:** Illustrative.
**Local check:** No complete runnable/project check is claimed for this illustrative folder.
**Developer-account verification:** Not verified.
**Production prerequisites:** Review [the checklist](../../REAL_TOOL_CHECKLIST.md) and [evidence](../../EVIDENCE.md); no production implementation is included.

Handler/card pattern only. Do not treat it as a complete deployable project or install its unpinned packages as a verified setup.


This example shows a simple HubSpot contact card pattern:

1. A card renders on a contact record.
2. It reads the current contact ID from HubSpot context.
3. It calls a backend/serverless function.
4. It renders loading, success, no-data, and error states.

The example uses mock data by default so users can understand the flow safely.

This is an illustrative handler/card pattern, not a complete deployable project.
For HubSpot hosting, create a Developer Project on platform `2026.09` and configure
the function's metadata and required product entitlements using the current docs.
Do not upload it as a legacy Design Manager `serverless.json` package. Managed
project functions use Node.js 24; the handler already returns asynchronously.
See `../../MIGRATION.md` for deadlines. Do not change hosting or credentials solely
because this example's documentation was updated.

## Files

- `src/app/app-hsmeta.json`: generic app metadata placeholder.
- `src/app/cards/ContactHealthCard.jsx`: example UI extension card.
- `src/app/cards/contact-health-card-hsmeta.json`: card metadata.
- `src/app/functions/contact-health.js`: serverless-function-style handler.
- `src/app/cards/package.json`: minimal card package metadata.

## AI Prompt

```text
Read this example and help me customize the contact card. Ask one question at a time. Keep mock data until I confirm I am ready to connect real CRM or external data.
```

## Security Notes

- Do not put private app tokens or external API keys in the card UI.
- Keep secrets in serverless functions or backend services.
- Do not log full contact records.
- Do not paste secrets or customer data into AI chat.

