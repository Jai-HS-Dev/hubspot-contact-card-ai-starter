# HubSpot Contact Card AI Starter

Plan and build HubSpot CRM contact app cards with help from any AI coding tool.

**Guided starter, not a finished production integration.**

**Your first result:** Run a mock card backend, understand the example's UI states, and write a small plan for a card inside a contact record. The mock card backend returns a sample brief. This first check does not display or install a card inside HubSpot.


This starter is for three kinds of users:

- Non-developers who want an AI assistant to guide them safely.
- Vibe coders who want to prototype real CRM cards without exposing secrets.
- Developers who want clear UI states, server boundaries, contracts, and portable backend patterns.

This repo is AI-tool-neutral and hosting-neutral. It can be used with Codex, Cursor, Claude Code, GitHub Copilot, Gemini CLI, Windsurf, or another coding assistant. A card can use HubSpot serverless functions, an external serverless endpoint, an OAuth-backed service, or mock data while learning.

## Quick Start

Follow [your first working result](docs/start-here.md): describe your goal, run the
credential-free mock, choose auth/hosting only if needed, make one small change,
and verify what is still unfinished. No account connection is needed to begin.

Using an assistant? Open [START_WITH_AI.md](START_WITH_AI.md). It should ask one
plain-language question at a time. The walkthrough includes Windows commands,
expected output, stop instructions and [safe recovery](docs/troubleshooting.md).

Experienced developers can jump to [architecture](docs/developer-architecture.md)
and [the contract](docs/contracts/contact-card-data-contract.md); the same evidence and safety limits apply.

## Current HubSpot Baseline

Read [EVIDENCE.md](EVIDENCE.md) for exactly what is implemented, tested locally,
and still needs developer-account or production verification. Run `npm test`
after setup as well as the smoke check; the two checks cover different behavior.
For behavior changes in existing copies, read [UPGRADE_NOTES.md](UPGRADE_NOTES.md).

This starter targets Developer Platform `2026.09`, date-based CRM API `2026-09`, and Node.js 22+. Read `COMPATIBILITY.md` before choosing auth or optional Fall 2026 features, and use `MIGRATION.md` when updating older code. App Actions are an optional public-beta surface; keep the normal record card workflow available as a fallback.

Implementation recipes for App Actions, user-level apps, and association behavior are in `docs/fall-2026-feature-recipes.md`.

Node.js 22+ above describes local examples, not every managed HubSpot runtime.
Workflow custom code now needs Node.js 24 async-return handlers. See
`MIGRATION.md` for the November editing deadlines and `COMPATIBILITY.md` for
the distinction between project functions, workflow actions, and external hosts.

## Pick Your Path

| You want | Start here |
| --- | --- |
| A first result without coding experience | [One guided walkthrough](docs/start-here.md) |
| A small feature to adapt with AI | The same walkthrough, then [recipes](recipes/README.md) |
| Contracts and implementation details | [Architecture](docs/developer-architecture.md) and [contracts](docs/contracts/contact-card-data-contract.md) |

[Choose your scope](docs/choose-your-path.md) before combining repositories. One
starter may be enough; companions are optional, not an installation bundle.

## If You Are An AI Coding Tool

[AGENTS.md](AGENTS.md) is the canonical operating guidance.
[START_WITH_AI.md](START_WITH_AI.md) starts the conversation; README.md explains
scope; [docs/start-here.md](docs/start-here.md) is the beginner path.
Read the selected example, [catalog](examples/catalog.json) and [evidence](EVIDENCE.md)
before claiming anything is implemented. Tool-specific adapters delegate to AGENTS.md.

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

The basic serverless example is illustrative, not a complete deployable project.
The Contact Brief example includes a full app/card source scaffold and a protected
card backend. Reusing its business logic for workflows/tools requires a separate
reviewed caller adapter; that workflow metadata is only a reference.

Both examples use generic placeholders and mock data first. Replace placeholders only after the user has chosen an auth model and hosting provider.

## What A Contact Card Can Do

A contact card can show useful information or actions inside a HubSpot CRM contact record. Depending on the design, it may:

- show external system data
- summarize contact information
- trigger a backend action
- display CRM-derived status
- link to a setup or auth flow

## Example Labels

[examples/catalog.json](examples/catalog.json) lists every example and its limits.
**Runnable locally** means the stated mock/offline check runs after its documented
setup. **Illustrative** means a pattern or scaffold, not a complete runnable or
deployable integration. **Developer-account verified** requires recorded installed
evidence; none of these examples currently claims it. **Production prerequisites**
are work to review, not a certification or an included production service.

| Example | Status | What the local evidence covers |
| --- | --- | --- |
| [examples/contact-card-with-agent-tool](examples/contact-card-with-agent-tool/README.md) | Runnable locally | Mock backend; full React tests need the reviewed optional UI packages. The project scaffold has not been cloud-build verified. |
| [examples/basic-contact-card-serverless](examples/basic-contact-card-serverless/README.md) | Illustrative | Handler/card pattern only. Do not treat it as a complete deployable project or install its unpinned packages as a verified setup. |

Use [EVIDENCE.md](EVIDENCE.md) for the current verification record. Every example's
README also states its status and points to the remaining live-use checklist.

## Security First

Never expose tokens or secrets in browser-visible card code. Keep sensitive CRM queries, external API calls, OAuth token handling, and private app tokens server-side.

## From Demo To Your Feature

Keep the [single guided path](docs/start-here.md): goal, mock, auth/hosting decision,
one small build, verification. You may stop at mock-only learning. Before real use,
finish [the checklist](REAL_TOOL_CHECKLIST.md) and obtain scoped approval; successful
mock tests are not a deployment or permission to touch live data.

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

This starter is released under the MIT license in `LICENSE`. That makes it permissive for learning, copying, modifying, publishing, distributing, sublicensing, and building real projects, as long as the required copyright and license notices are preserved when substantial portions are reused.

The MIT license includes the warranty disclaimers and liability limitations in [LICENSE](LICENSE). This starter is not legal advice, a security audit, a compliance review, HubSpot approval, marketplace approval, or a production guarantee. Builders are responsible for reviewing, configuring, testing, and operating their implementations.

Before using generated code with real HubSpot data or real users, review `docs/implementation-responsibility.md`, `REAL_TOOL_CHECKLIST.md`, and `docs/non-developer-safety-gates.md`. Builders are responsible for checking their own HubSpot developer requirements, auth model, scopes, hosting setup, token storage, privacy obligations, platform terms, and production readiness.
