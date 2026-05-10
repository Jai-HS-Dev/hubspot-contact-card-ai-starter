# Contact Card With Agent Tool Backend

This example shows how a contact card can call a backend endpoint that also looks like an agent-tool endpoint.

Use this when the same backend logic should support:

- a HubSpot contact card
- a HubSpot agent tool
- a workflow action
- another backend integration

## Files

- `server.js`: hosting-neutral backend endpoint.
- `src/app/cards/ContactBriefCard.jsx`: app card UI.
- `src/app/cards/contact-brief-card-hsmeta.json`: card metadata.
- `src/app/workflow-actions/contact-brief-hsmeta.json`: agent-tool/workflow-action metadata.

## Try The Backend Locally

```bash
node server.js
```

Then:

```bash
curl -X POST http://localhost:3000/api/contact-brief \
  -H "content-type: application/json" \
  -d "{\"inputFields\":{\"contactId\":\"demo-contact-001\"}}"
```

## Security Notes

- Keep the card UI free of private tokens.
- Put secrets in the backend host's secret manager.
- Use OAuth or another reviewed server-side auth pattern for real users.
- Do not log full CRM records.

