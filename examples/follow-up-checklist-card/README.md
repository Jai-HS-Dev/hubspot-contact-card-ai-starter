# Build A Follow-up Checklist Card

**Example status:** Runnable locally.
**Developer-account verification:** Not verified.
**Production prerequisites:** See [implementation responsibility](../../docs/implementation-responsibility.md)
and [where to get help](../../docs/SUPPORT.md).

Build a small panel that reminds a sales rep what to do before following up.
It displays the same sample checklist on every contact. It does not read CRM
records, save progress, send messages, create tasks, or call a backend.

## 1. Run It And Make One Change

From the starter root, run `npm run build:example`. Use `npm.cmd` in Windows
PowerShell. The terminal should print three sample steps. No packages, account,
credentials, or hosting are needed for this check.

Open [checklist.mjs](src/app/cards/checklist.mjs). Change the second step from
"Agree on the next meeting date." to "Confirm the demo date." Run the command
again and check that only the second step changed. The card uses the same file.

## 2. See It On A HubSpot Record

Use a developer test account and one synthetic contact. Approve dependencies,
account sign-in, upload, app installation, and any layout edit separately. If
the project name already exists in the target account, stop and use a new name.

1. Follow [HubSpot's CLI setup](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/install-the-cli).
   Open a terminal in this example folder, where `hsproject.json` lives.
2. After reviewing and approving the locked UI dependencies, run
   `npm ci --prefix src/app/cards --ignore-scripts`.
3. Run `hs project validate --account YOUR_TEST_ACCOUNT_ID`, then
   `hs project upload --account YOUR_TEST_ACCOUNT_ID` after approval. Replace
   the placeholder locally with your developer test account ID. Check the
   build before installing the private app.
4. Install the app in the test account and [add the card to a Contacts view](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/extension-points/app-cards/create-an-app-card#view-the-card-in-hubspot).
   Use an isolated view if available. A default-view edit can affect other
   users in that account and needs approval.
5. Reload the synthetic contact. Success is **Example Follow-up Checklist**
   showing your edited step. If missing, check the account, app installation,
   granted scopes, and selected view before changing anything else.

The app requests Contacts read for card availability, not a write scope.
That grant is account-wide; the example does not use it to fetch records.
There is no external host, proxy, tunnel, or browser local-network permission.

## 3. Decide What Comes Next

For external lookups or server-side secrets, read the
[hosting decision guide](../../docs/hosting-options.md) before choosing a host.
Do not treat an installed test card as production verification.
