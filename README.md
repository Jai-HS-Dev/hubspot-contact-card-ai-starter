# HubSpot Contact Card AI Starter

Plan and build HubSpot CRM contact app cards with help from any AI coding tool.

This starter is for three kinds of users:

- Non-developers who want an AI assistant to guide them safely.
- Vibe coders who want to prototype real CRM cards without exposing secrets.
- Developers who want clear UI states, server boundaries, contracts, and portable backend patterns.

This repo is AI-tool-neutral and hosting-neutral. It can be used with Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, or another coding assistant. A card can use HubSpot serverless functions, an external serverless endpoint, an OAuth-backed service, or mock data while learning.

## Quick Start

If you are using an AI coding tool, start here:

```text
Read START_WITH_AI.md first, then README.md, AGENTS.md, docs/start-here.md, docs/contact-card-blueprint.md, docs/non-developer-safety-gates.md, and docs/security-for-non-developers.md.

Ask me one question at a time. Start with mock card data. Do not ask me to paste secrets, access tokens, refresh tokens, client secrets, portal IDs, private URLs, or customer data into chat.

Help me build a real HubSpot contact card safely.
```

Then run the local checks:

```bash
npm run check:ai
npm run smoke:example
```

On Windows PowerShell, if `npm` is blocked by script policy, use:

```powershell
npm.cmd run check:ai
npm.cmd run smoke:example
```

## Pick Your Path

### I Am A Non-Developer

Start with these files:

- `START_WITH_AI.md`: paste this into your AI tool.
- `docs/contact-card-blueprint.md`: helps describe the card before coding.
- `docs/non-developer-safety-gates.md`: plain-English safety steps.
- `docs/security-for-non-developers.md`: what never to paste into chat.
- `REAL_TOOL_CHECKLIST.md`: tells you when the card is becoming a real usable tool.

Your safest path is mock UI states first, then choose whether the card needs HubSpot serverless functions, an external endpoint, or OAuth.

### I Am Vibe Coding

Start with:

- `recipes/contact-health-card/`
- `recipes/next-best-action-card/`
- `recipes/setup-required-card/`
- `.github/prompts/build-my-first-hubspot-feature.prompt.md`
- `.github/prompts/turn-mock-into-real-hubspot-api.prompt.md`

Ask your AI tool to build all UI states before connecting real CRM data.

### I Am A Developer

Start with:

- `docs/developer-architecture.md`
- `docs/contracts/contact-card-data-contract.md`
- `examples/basic-contact-card-serverless/`
- `examples/contact-card-with-agent-tool/`
- `scripts/ai-readiness-check.js`
- `scripts/smoke-example.js`

The included examples show both a HubSpot-serverless-style pattern and a backend-endpoint pattern.

## If You Are An AI Coding Tool

Read these first, in order:

1. `AGENTS.md`
2. `START_WITH_AI.md`
3. `docs/contact-card-blueprint.md`
4. `docs/non-developer-safety-gates.md`
5. `docs/security-for-non-developers.md`
6. `docs/contracts/contact-card-data-contract.md`
7. The relevant `recipes/*/README.md`

Rules:

- Ask one question at a time for non-technical users.
- Start with mock data and all expected UI states.
- Do not ask for secrets in chat.
- Keep tokens, client secrets, and external API keys out of browser components.
- Do not hard-code real portal IDs, app IDs, account IDs, private URLs, tokens, or customer data.
- Explain the server boundary before connecting real HubSpot data.
- Run `npm run check:ai` and `npm run smoke:example` after meaningful changes.

## What This Repo Is

- A beginner-friendly guide for planning a HubSpot contact card.
- An AI-readable project structure for coding assistants.
- A security-first reference for app cards, serverless functions, external endpoints, and OAuth-backed data.
- A starter reference with mock-first examples.

## What This Repo Is Not

- It is not an official HubSpot product.
- It is not affiliated with, endorsed by, or sponsored by HubSpot.
- It is not a security audit, legal recommendation, or production guarantee.
- It does not include private deployment URLs, real HubSpot account IDs, portal IDs, tokens, client secrets, or customer data.

## Examples Included

```text
examples/basic-contact-card-serverless/
examples/contact-card-with-agent-tool/
```

Use the serverless example when the card can stay mostly inside the HubSpot project model. Use the agent-tool example when the card should reuse a backend endpoint that can also power HubSpot agent tools or workflows.

Both examples use generic placeholders and mock data first. Replace placeholders only after the user has chosen an auth model and hosting provider.

## What A Contact Card Can Do

A contact card can show useful information or actions inside a HubSpot CRM contact record. Depending on the design, it may:

- show external system data
- summarize contact information
- trigger a backend action
- display CRM-derived status
- link to a setup or auth flow

## Security First

Never expose tokens or secrets in browser-visible card code. Keep sensitive CRM queries, external API calls, OAuth token handling, and private app tokens server-side.

## Real Card Workflow

1. Start with `START_WITH_AI.md`.
2. Fill out `docs/contact-card-blueprint.md`.
3. Choose a recipe.
4. Build loading, success, no-data, needs-setup, and error states with mock data.
5. Choose auth and hosting using `docs/auth-options.md` and `docs/hosting-options.md`.
6. Run `npm run check:ai` and `npm run smoke:example`.
7. Review `REAL_TOOL_CHECKLIST.md` before real CRM data.

## Repo Map

- `AGENTS.md`: primary instructions for AI coding tools.
- `START_WITH_AI.md`: first prompt for any AI coding tool.
- `.github/prompts/`: reusable AI task prompts.
- `.github/instructions/`: GitHub Copilot guidance.
- `.cursor/rules/`: Cursor guidance.
- `.windsurfrules`: Windsurf guidance.
- `docs/`: card planning, safety, architecture, auth, hosting, and contracts.
- `recipes/`: mock-first card plans.
- `examples/`: runnable starter examples.
- `scripts/`: AI readiness and smoke checks.

## License And Implementation Responsibility

This starter uses the MIT license, which is a good fit for community learning, copying, remixing, and building. The license is permissive, but the generated app is still the builder's responsibility.

Before using a tool with real HubSpot data, review `docs/implementation-responsibility.md`, `REAL_TOOL_CHECKLIST.md`, and `docs/non-developer-safety-gates.md`. Builders should verify their own HubSpot developer requirements, scopes, auth model, hosting setup, data/privacy obligations, and production readiness.
