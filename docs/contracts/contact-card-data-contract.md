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

- loading
- success
- no data
- needs setup
- error

## Safety

Do not expose tokens to browser components. Keep sensitive CRM queries and external API calls server-side.
