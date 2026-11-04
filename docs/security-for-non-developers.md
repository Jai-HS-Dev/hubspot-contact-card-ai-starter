# Security For Non-Developers

## Optional AI Connector Access

Do not enable Sensitive Data access just to finish setup. Require explicit admin
approval, permitted data use, minimum permissions, and safe log retention first.
The beta gives Remote MCP read-only Sensitive Data engagements, not Sensitive Data
properties; Highly Sensitive Data properties remain restricted. Engagement writes
through AI connectors are blocked in accounts with Sensitive Data enabled, even if
a write tool or permission is visible. Never retry by broadening access.

These are AI-connector restrictions, not a new authentication model for your
backend app. Reconnection for this beta needs approval; do not disconnect a
working connector automatically. See [HubSpot's permission guide](https://knowledge.hubspot.com/account-security/configure-ai-connector-access-sensitive-data).

## Everyday Safety

Contact cards can sit close to sensitive CRM data, so be careful.

Do not paste these into AI chat:

- API keys
- access tokens
- refresh tokens
- client secrets
- private app tokens
- customer data
- screenshots showing private CRM records

Use placeholders:

```text
EXTERNAL_API_KEY=<stored in hosting secret manager>
```

If a card shows customer data, ask:

- Does the user need to see this?
- Could this be logged accidentally?
- Could this appear in browser-visible code?
- Does the company allow this data to be sent to the selected service?

