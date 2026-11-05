# HubSpot Contact Card AI Starter

Build a useful app card inside a HubSpot contact record, starting with made-up data.

**A practical blueprint for building and testing your own HubSpot integration,
not a finished production app.**
Start with made-up data, then connect a suitable HubSpot account to test your real
feature. No coding experience is assumed; the guide helps you choose each next step.

## What This Helps You Build

Possible projects include a contact summary, an external-system status, or a button for a backend action. These are ideas to adapt, not installed features.

**Your first result:** Run a sample card backend, then plan what someone should see or do on your card. This first check does not display or install a card in HubSpot.

## Choose Your Starting Point

### I'm New To Coding

Follow [the step-by-step walkthrough](docs/start-here.md). It explains how to
open the project, where to type commands, what success looks like and how to stop.
Your assistant should ask one plain-language question at a time.

### I'm Building With AI

Open this repository in your coding assistant and use the prompt below. Start
with the same mock example before adapting a [feature recipe](recipes/README.md).

### I'm A Developer

Jump to [architecture](docs/developer-architecture.md), the
[data contract](docs/contracts/contact-card-data-contract.md) and the example README.
The same safety and verification limits apply.

## Start With Your AI Assistant

Paste this into an assistant that can read the repository files:

```text
Read README.md, AGENTS.md and START_WITH_AI.md.
Help me build a HubSpot contact card that [describe your goal].
Start with the mock example. Ask one question at a time.
Explain each command and its expected result before I run it.
Never ask me to paste secrets or customer data.
When I am ready for a HubSpot test, use docs/connect-to-hubspot.md.
Help me choose an account, authentication and hosting without assuming I need OAuth.
Ask for explicit approval before packages, account access, live writes or deployment.
```

[START_WITH_AI.md](START_WITH_AI.md) has the fuller first-conversation prompt.
[AGENTS.md](AGENTS.md) holds the canonical coding instructions; tool-specific files
point there. You can use different AI editors; automatic instruction loading varies.
No MCP connection is needed for the local example.

## Try The Safe Example

A **mock** uses made-up data. You need Node.js and npm; the examples declare
Node.js 22+, and the [walkthrough](docs/start-here.md) records the tested version
and setup guidance. This describes local examples, not managed HubSpot runtimes.

Download and extract the repository, then open a terminal in the folder containing
`README.md` and `package.json`. Run:

```bash
npm run doctor
npm run smoke:example
```

On Windows PowerShell, use:

```powershell
npm.cmd run doctor
npm.cmd run smoke:example
```

No `npm install`, credentials, HubSpot account or hosting is needed for this first
check. The doctor should report `"ok": true`; the example should end with:

```text
card smoke example passed.
```

The backend (the server-side part) returned a sample contact brief. This does not render a card or verify an installed HubSpot app.
The check closes its local server automatically.

If a command fails, stop and use [troubleshooting](docs/troubleshooting.md).
Do not weaken security settings or enter live credentials to make it pass.

## Connect To HubSpot When You're Ready

For package-free backend tests, run `npm run test:core`. Full UI tests need the
reviewed nested lockfile install described in [the worked exercise](docs/worked-example.md);
`npm test` stops with setup instructions when those packages are missing.

The mock needs no account connection. Installing a card/tool or working with real
HubSpot data does need a suitable account, permissions and authentication.
Use [the connection guide](docs/connect-to-hubspot.md) to choose or create a
separate developer test account, check feature availability, and plan OAuth or
another supported option. Your assistant should explain the choices and ask
approval before setup or connection. Test first; production is a separate decision.

## What Is Included And What Isn't

| Example | Status and limits |
| --- | --- |
| [Contact Brief card](examples/contact-card-with-agent-tool/README.md) | Runnable locally: mock backend, plus app/card source. Full React tests require the documented optional UI package setup. Cloud build and installation are unverified. |
| [Basic serverless card](examples/basic-contact-card-serverless/README.md) | Illustrative pattern only; no installable package or complete deployable project. |

A real card still needs a verified build/install, server-side caller/account/user/record authorization and developer-account tests. Reusing its logic as a workflow or agent tool needs a separate caller adapter.

[Evidence](EVIDENCE.md) and the [example catalog](examples/catalog.json) distinguish
local tests, illustrative code and remaining work. No example currently claims
developer-account verification or production readiness.

After the demo, follow one path: **describe your goal, run the mock, choose
authentication/hosting only if needed, make one small change, verify**.
Use the [blueprint](docs/contact-card-blueprint.md) to plan that change.

[Authentication choices](docs/auth-options.md) and
[hosting choices](docs/hosting-options.md) explain alternatives, not ready-made
adapters for every provider. [Check which starter you need](docs/choose-your-path.md);
companion repositories are optional.

## Safety Essentials

1. Keep secrets and customer data out of AI chats, GitHub, screenshots and logs.
   Keep credentials server-side, never in browser/card code.
2. Use mock data first. Approve the exact account, minimum access and operation
   before live access, writes, publishing or deployment.
3. Passing local tests is not proof of security or production readiness.
   Review the [live-use checklist](REAL_TOOL_CHECKLIST.md) before real use.

Read [plain-English security guidance](docs/security-for-non-developers.md) and
[the approval gates](docs/non-developer-safety-gates.md) for the full process.

## Developer Reference

For a small next step, try [the worked exercise](docs/worked-example.md).
New terms are explained in [the glossary](docs/glossary.md).

- [Architecture](docs/developer-architecture.md) and [contract](docs/contracts/contact-card-data-contract.md).
- [Compatibility and reviewed versions](COMPATIBILITY.md), [migration guidance](MIGRATION.md) and [upgrade notes](UPGRADE_NOTES.md).
- [Optional feature recipes](docs/fall-2026-feature-recipes.md) and [verification evidence](EVIDENCE.md).

After the selected example's documented setup, run `npm run check:ai`,
`npm run check`, `npm test` and `npm run smoke:example` (use `npm.cmd` on Windows).
Report skipped or failed checks; mock checks do not verify a live installation.

## Help And License

See [troubleshooting](docs/troubleshooting.md) and [support expectations](SUPPORT.md).
Support is best-effort; report vulnerabilities through [SECURITY.md](SECURITY.md),
without posting credentials or customer data.

Licensed under [MIT](LICENSE); preserve the required copyright and license notices
when reusing the code. The license contains warranty disclaimers and liability
limitations. Builders remain responsible for implementation, testing, security,
privacy and operation; see [implementation responsibility](docs/implementation-responsibility.md).

This is an independent community starter, not affiliated with or endorsed by
HubSpot, and not a security audit, legal advice or production guarantee.
