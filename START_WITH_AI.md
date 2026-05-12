# Start With AI

Paste this into Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, or another AI coding tool:

```text
I am using this HubSpot contact card starter repository to build something real.

Read README.md, AGENTS.md, docs/start-here.md, docs/choose-your-path.md, docs/security-for-non-developers.md, docs/auth-options.md, and docs/contact-card-blueprint.md before making changes.

Ask me one question at a time. Start with mock card data unless I explicitly choose real HubSpot data. Do not ask me to paste secrets, access tokens, refresh tokens, client secrets, portal IDs, private URLs, or customer data into chat.

Help me choose the simplest safe card architecture:
- HubSpot serverless function
- external endpoint
- OAuth-backed service
- card connected to an agent tool
- mock-only prototype
- help me choose

Before editing code, create a short contact card blueprint. After editing, tell me what changed, what command to run, and what security step I should verify.
```

## Safe Default

Start with a card that renders mock data and all expected UI states. Connect real CRM data only after auth, scopes, server boundaries, and logging are clear.
