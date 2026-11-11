# Contact Brief: Card, Protected Backend And CRM Read

**Example status:** Runnable locally.
**Local check:** `npm run smoke:example` from the repository root, after the documented setup.
**Developer-account verification:** Not verified.
**Production prerequisites:** Review [the checklist](../../docs/REAL_TOOL_CHECKLIST.md) and [evidence](../../docs/EVIDENCE.md); no production implementation is included.

Mock backend; full React tests need the reviewed optional UI packages. The project scaffold has not been cloud-build verified.


A complete app/card source scaffold with a hosting-neutral Node backend. It
shows one practical path: record context -> hubspot.fetch -> request validation
-> authorized account lookup -> display-only response. It never writes CRM data.
It has not been uploaded, installed or cloud-build-verified in this release.

## Try The Backend Without Credentials

From this directory run `node server.js`. It binds only to 127.0.0.1:3000 and uses
mock data. From the repository root, `npm.cmd run smoke:example` tests the backend.
No npm install, HubSpot login or tunnel is required for the mock backend.

For the complete local test suite, install the reviewed card lockfile first:

```powershell
cd examples/contact-card-with-agent-tool/src/app/cards
npm.cmd ci --ignore-scripts
cd ../../../../..
npm.cmd test
```

Review third-party packages before installation. Pins are @hubspot/ui-extensions
1.0.1 and its required React 18.3.1; no install hooks are needed. The suite uses the
SDK's real React renderer for setup/loading/success/empty/error/refresh states,
and synthetic signatures/API responses for backend tests. It never calls HubSpot.

Without UI packages, `npm run test:core` from the repository root runs backend,
metadata and guidance tests. `npm test` still means the full suite; missing UI
dependencies produce instructions, not silent skips. `npm run test:ui` runs only
the renderer scenarios after the same setup.
The UI view uses React.createElement so tests need no extra JSX compiler package.

## Files

- hsproject.json: platform 2026.09, source root ./src.
- src/app/app-hsmeta.json: private OAuth app with minimum contact-read scope.
- src/app/cards/ContactBriefCard.jsx: entrypoint and public endpoint placeholder.
- src/app/cards/ContactBriefView.js: actual tested React view.
- server.js: bounded requests, HubSpot v3 signature validation and contact read.
- .env.example: placeholder-only server configuration.
- reference/contact-brief-action.example.json: illustrative workflow/tool metadata,
  **outside the uploaded source**. It is not wired to this card-only backend.

## Configure A Developer-Account Trial

Do this only after approval for the exact app/account and synthetic record.

1. Preserve existing app UIDs/auth for a real migration. For a new learning app,
   review the placeholder UIDs, minimal scopes and callback registration.
2. Choose an approved HTTPS backend host. Replace the public origin in the app's
   permittedUrls and the endpoint in ContactBriefCard.jsx. Never put a secret in
   those files. The UI shows Setup required until the endpoint is changed.
3. Keep the backend in mock mode while testing rendering. For local development,
   follow HubSpot's documented proxy/signing setup; localhost is not a permitted
   fetch URL. Creating a public tunnel requires a separate approval.
4. For live read-only mode, copy .env.example to ignored .env. Set USE_MOCK_DATA=false,
   the app client secret, server-side access token, exact PUBLIC_ORIGIN, account ID,
   app ID and a comma-separated AUTHORIZED_USER_IDS allowlist. Use `npm.cmd start`.
5. The access token must belong to that exact account and have contacts.read.
   This is a single-account developer reference. Replace short-lived environment
   tokens with tenant-keyed OAuth retrieval/refresh from the OAuth companion for
   reusable apps; never pass credentials through a browser or arbitrary body fields.
6. Review your host adapter, authorization and logs before any approved upload.
   The local listener does not expose a public service and is not a Worker adapter.
7. With separate approval, upload/test the exact project in a developer account,
   add the card to the intended contact view, and verify authorized/denied users,
   no-data behavior and the correct record. Save actual results before production.

## Security Boundary

Live mode requires a HubSpot v3 signature over the original raw body, exact public
URL and recent timestamp (within five minutes). It verifies the signed app/account/
user metadata, rejects duplicate identity parameters, and ignores body identity
claims and Host/Forwarded headers. Unsupported signature versions are rejected;
never add an unsigned fallback to solve a connection problem.

**A valid signature identifies a caller; it does not prove record permission.**
The explicit user allowlist is a coarse operator-controlled grant to read the
selected contact fields in this single account. Approve only users permitted to
access those records. Implement per-record/user authorization before a broader
rollout; an app token must not be treated as inheriting the UI user's permissions.
Refresh tokens, client secrets and API tokens remain server-side.

The endpoint returns display fields only and performs no writes. Recent signed
reads may be replayed during the timestamp window; any future mutation requires
its own confirmation, idempotency/replay controls and tests. Add hosting-level
rate limits, request timeouts and audit retention before exposing the backend.
Sensitive Data scopes cannot use hubspot.fetch; don't request them for this demo.

## Why Workflow Metadata Is Only A Reference

Workflow/agent requests have different envelopes and potentially different
signature versions/identity fields. Registering that reference without a reviewed
adapter would fail authorization. Start from the agent-tools companion, validate
the exact caller contract, and reuse business logic behind separate auth routes.
No workflow action is installed by this card project.

[Fetching data and signed metadata](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/fetching-data)
[Request validation](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/request-validation)

