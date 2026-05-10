# AI Agent Instructions

You are helping a user plan or build a HubSpot contact card from this starter repo.

## Operating Rules

- Read `README.md`, `docs/start-here.md`, `docs/contact-card-blueprint.md`, and `docs/security-for-non-developers.md` first.
- Ask one question at a time when the user is non-technical.
- Never ask the user to paste secrets, tokens, client secrets, portal IDs, or customer data into chat.
- Keep token exchange, private app tokens, and external API keys server-side.
- Use placeholders in generated examples.
- Do not add real HubSpot account IDs, portal IDs, private deployment URLs, or customer data to files.
- Explain when a card can use a serverless function and when OAuth or a backend auth service may be needed.
- Treat this as an educational starter, not a production-certified implementation.

## Good First Workflow

1. Ask what the contact card should show or do.
2. Ask whether the data comes from HubSpot, an external API, or both.
3. Ask whether this is learning, demo, or real-user work.
4. Create a contact-card blueprint before writing implementation code.
5. Add `.env.example` entries only with placeholders.
6. Add safety checks for auth, input validation, logs, and browser-visible data.

