# Recipe: Next Best Action Card

Build a card that recommends one useful next step for the current contact.

## Good First Version

Use mock logic based on lifecycle stage, recent activity, or missing fields. Do not call AI APIs or HubSpot APIs until the card behavior is clear.

## Output

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
Use the next best action card recipe. Build a mock-first card and a server-side placeholder function. Do not write to CRM until I explicitly choose write scopes.
```