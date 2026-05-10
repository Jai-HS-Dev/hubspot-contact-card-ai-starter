# Basic Contact Card With Serverless Function

This example shows a simple HubSpot contact card pattern:

1. A card renders on a contact record.
2. It reads the current contact ID from HubSpot context.
3. It calls a backend/serverless function.
4. It renders loading, success, no-data, and error states.

The example uses mock data by default so users can understand the flow safely.

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

