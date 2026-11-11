# Evidence And Support

## Developer Test Account Build And Install

On 2026-11-11, the HubSpot CLI scaffolded an isolated private static-auth
project on platform 2026.09. The pilot used the starter's card view, the
existing locked UI dependencies, and an example URL for the local proxy.
The CLI validator, HubSpot build, test-account deploy, and first app
installation succeeded. No CRM read/write scopes or public backend were
configured. HubSpot automatically added its required `oauth` scope group.

In the follow-up trial, the app card appeared on a synthetic contact after
Contacts read and view placement were configured. The browser blocked local
network access, so that observation confirms placement, not delivery of the
mock brief. Live signing and record authorization remain unverified. This was
the backend-connected pilot, not an account test of the new checklist example.

## Follow-Up Brief Pilot

Checked 2026-11-11 on Windows with Node.js 24.22.1. The local preview shows
a fixed sample lifecycle stage and a follow-up suggestion. The backend test
requests two synthetic IDs, checks each returned brief against the requested
ID, and confirms that mock mode makes no CRM calls.

- Readiness, syntax, doctor, smoke, and preview commands passed. Core tests:
  28 passed, none skipped. Signed-request tests used synthetic caller metadata.
- The optional SDK UI suite was not run; its dependencies were not installed.
- The developer-account walkthrough is prepared, not verified. No app was
  uploaded or installed for this check. Actual HubSpot signing, user/record
  authorization, and production readiness remain unverified.

## README And Preview Update Verification

Checked 2026-11-10 on Linux with Node.js 22.23.4 and 24.22.2, in an automated run by an AI
coding assistant. This is not an independent beginner test.

- `npm run check:ai`, `npm run check`, `npm run doctor`, `npm run smoke:example`,
  `npm run test:core` and the full `npm test` (after the locked UI install) passed.
- `npm run preview` wrote the local page; docs/img/sample-card-preview.png is a
  capture of that page. It shows made-up data and is not the HubSpot UI.
- Every relative link in the Markdown files was checked to resolve to a file.
- Not established: how the README renders on GitHub, the dev container in
  GitHub Codespaces, and every step of docs/first-live-test.md. No HubSpot
  account was connected and nothing was uploaded.

## Starter Follow-Through Verification

Checked 2026-11-05 on Windows with Node.js 24.22.1:

- Full local suite: 29 passed, none skipped in the final run.
- Readiness, source syntax and documented first-demo checks passed.
- Fresh source snapshots excluded Git metadata, filled environment files and node_modules.
- In the fresh card copy, core checks passed without packages; full tests stopped
  with the expected setup instructions, then passed after the reviewed locked install.
- The existing UI dependency lockfile was audited against npm's advisory service:
  no reported vulnerabilities at that check. This is not a security certification.
- The worked exercise's changed expectation failed, then its documented matching
  change passed in an isolated copy. This was a self-run command walkthrough.
- Independent beginner/AI-client testing, Node.js 22 and Linux execution, GitHub CI runs, cloud builds and installed
  HubSpot behavior are not established by these checks.

The CI matrix is intended coverage, not a recorded remote result. GitHub settings
and publishing remain separate approvals. No live accounts were connected,
customer records accessed, apps uploaded or services deployed during this update.

Reviewed 2026-11-04. Evidence is specific to each example, not certification of
apps generated from it. A successful HTTP response or AI answer is not a security
review or proof of installation.

| Surface | Current evidence |
| --- | --- |
| Contact Brief project | Complete app/card source scaffold; schema reviewed for 2026.09 |
| React view | Tested with the actual HubSpot SDK renderer |
| Backend signature/account/user checks | Locally tested with synthetic signed requests |
| CRM read | Tested with injected synthetic API responses, not real account data |
| Basic serverless example | Illustrative only; not a complete serverless project |
| HubSpot cloud build, installation and production | Not verified |

## Before Real Users

1. Run the documented local tests with synthetic data. Do not skip failing tests.
2. Review authentication, account/user authorization, minimum scopes and logs.
3. For reusable apps, replace temporary environment tokens with an authenticated,
   tenant-keyed OAuth installation store; never return credentials to the UI.
4. Choose a host and verify HTTPS, private secrets, request limits, rate limiting,
   timeouts, storage, retention, health checks and recovery for that host.
5. Obtain approval for the exact developer app/account and synthetic live test.
6. Record the actual build, installed behavior and unresolved limitations before
   claiming account verification. Request separate approval for production.

No automated command here uploads or deploys the app. The test-only CI source
now includes the full suite and a Windows/Linux, Node.js 22/24 matrix; a workflow
file alone does not prove a successful GitHub run. Report security problems using SECURITY.md; do not
post credentials or customer data in public issues. Support is best-effort, as
stated in SUPPORT.md. MIT terms are in LICENSE, not a guarantee of legal immunity.

## Example Label Contract

[examples/catalog.json](../examples/catalog.json) is the machine-readable index; each
example README repeats its label next to the code.

- **Runnable locally:** the named mock/offline check runs after documented setup.
  It does not imply installed or live-account verification.
- **Illustrative:** a pattern, fixture boundary or source scaffold; not a complete
  deployable integration. Component-level tests do not verify the whole project.
- **Developer-account verified:** requires recorded evidence for the exact app,
  account and operation. None is claimed for these examples.
- **Production prerequisites:** the builder's remaining checklist, not included
  production hosting, security certification or ongoing operation.

The beginner finish line is the local demo plus a small plan. See
[the walkthrough](start-here.md) for success, recovery and what remains.
