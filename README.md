# HubSpot Contact Card AI Starter

This is a community starter kit for planning and building HubSpot contact app cards with help from an AI coding assistant.

It is written for developers, non-developers, and vibe coders who want to understand app cards, serverless functions, auth choices, and safe CRM data handling.

## What This Repo Is

- A beginner-friendly guide for planning a HubSpot contact card.
- An AI-readable project structure for coding assistants.
- A security-first reference for app cards, serverless functions, and OAuth-backed data.
- A starter reference, not a production-certified app.

## What This Repo Is Not

- It is not an official HubSpot product.
- It is not affiliated with, endorsed by, or sponsored by HubSpot.
- It is not a security audit, legal recommendation, or production guarantee.
- It does not include private deployment URLs, real HubSpot account IDs, portal IDs, tokens, client secrets, or customer data.

## Start Here

Give your AI coding tool this instruction:

```text
Read this repository before making changes. Start with README.md, AGENTS.md, docs/start-here.md, docs/contact-card-blueprint.md, and docs/security-for-non-developers.md.

Walk me step by step to plan a HubSpot contact card. Ask one question at a time. Do not ask me to paste secrets, tokens, client secrets, refresh tokens, portal IDs, or customer data into chat. When secrets are needed, tell me how to enter them in my terminal, local .env file, or hosting provider secret manager.
```

## What A Contact Card Can Do

A contact card can show useful information or actions inside a HubSpot CRM contact record. Depending on the design, it may:

- show external system data
- summarize contact information
- trigger a backend action
- display CRM-derived status
- link to a setup or auth flow

## First Decisions

- What should the card show?
- Does it need HubSpot CRM data?
- Does it need external API data?
- Can it use a HubSpot serverless function?
- Does it need OAuth or another backend auth service?
- What data should never appear in logs or browser-visible code?

See [docs/choose-your-path.md](docs/choose-your-path.md).

## Repo Contents

- `AGENTS.md`: instructions for AI coding agents.
- `examples/basic-contact-card-serverless/`: a card that calls a HubSpot serverless function-style endpoint.
- `examples/contact-card-with-agent-tool/`: a card pattern that calls an agent-tool-style backend endpoint.
- `docs/contact-card-blueprint.md`: planning template for a card.
- `docs/auth-options.md`: how to think about serverless functions, OAuth, and backend auth.
- `docs/security-for-non-developers.md`: plain-English security guide.
- `.env.example`: placeholder-only environment variables.
- `.github/ISSUE_TEMPLATE/`: issue forms that warn users not to share secrets.

## Production Reminder

Before using a contact card with real customer data, validate your own HubSpot scopes, app-card permissions, hosting security, auth model, logging, privacy requirements, and compliance needs.

## Examples Included

```text
examples/basic-contact-card-serverless/
examples/contact-card-with-agent-tool/
```

Use the serverless example when the card can stay mostly inside the HubSpot project model. Use the agent-tool example when the card should reuse a backend endpoint that can also power HubSpot agent tools or workflows.

Both examples use generic placeholders and mock data first. Replace placeholders only after the user has chosen an auth model and hosting provider.
