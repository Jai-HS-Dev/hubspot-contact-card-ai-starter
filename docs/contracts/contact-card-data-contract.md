# Contact Card Data Contract

Contact cards should handle predictable states before connecting to real data.

## Card Data

```json
{
  "state": "success",
  "title": "Contact Health",
  "summary": "This contact has recent activity and one open deal.",
  "items": [
    { "label": "Lifecycle stage", "value": "Customer" },
    { "label": "Open deals", "value": "1" }
  ],
  "actions": [
    { "label": "Create follow-up task", "type": "serverAction" }
  ]
}
```

## Required UI States

The JSON above is a design example, not the only transport shape. The complete
Contact Brief example uses an agent-style envelope instead:

```json
{
  "hs_execution_state": "SUCCESS",
  "outputFields": {
    "brief": "Synthetic contact at Example: lead.",
    "nextStep": "Review the record before following up.",
    "status": "sample"
  }
}
```

Its status is sample, live or empty; failures use a non-success HTTP status and a
bounded error. The React view validates the success envelope and field types.
Do not feed the generic state/title/items shape directly to ContactBriefView.js.

- loading
- success
- no data
- needs setup
- error

## Safety

Do not expose tokens to browser components. Keep sensitive CRM queries and external API calls server-side.
