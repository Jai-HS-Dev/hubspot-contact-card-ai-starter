# Recipe: Setup Required Card

Build a card that safely tells the user what setup is missing.

## Best For

- OAuth not connected yet.
- External API key missing.
- App installed but backend not configured.
- User needs admin help.

## Output

```json
{
  "state": "needs_setup",
  "message": "Connect the app before loading contact insights.",
  "nextStep": "Open the app settings page and complete OAuth."
}
```

## Prompt

```text
Use the setup required card recipe. Add a helpful setup state without exposing private URLs, tokens, stack traces, or internal deployment details.
```