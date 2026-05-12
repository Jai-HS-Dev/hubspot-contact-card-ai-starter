# Recipe: Contact Health Card

Build a contact card that shows a simple health summary and suggested next step.

## UI States

- loading
- success
- no data
- needs setup
- error

## Mock-First Data

```json
{
  "state": "success",
  "status": "Healthy",
  "reason": "Recent engagement and no overdue follow-up.",
  "nextStep": "Send a check-in next week."
}
```

## Safe Real HubSpot Upgrade

Start with read-only contact properties. Keep external API calls and tokens server-side in a HubSpot serverless function or external endpoint.

## Prompt

```text
Use the contact health card recipe. Build all UI states with mock data first. Keep secrets out of browser components and explain the server boundary before connecting real data.
```