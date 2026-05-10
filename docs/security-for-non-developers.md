# Security For Non-Developers

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

