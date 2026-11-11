# Do I Need Hosting?

Hosting gives your backend a place to run when your computer is off. A backend
is the part of an app that does work away from the card, such as calling another
system with a private key. **Start without a separate host. Add one only when
you can explain what work needs to run there and who needs it.**

## Pick A Path

| What I want | Where it runs | What to check |
| --- | --- | --- |
| See a sample brief or change its wording | On your computer, using the [mock walkthrough](start-here.md) | No HubSpot account, credentials, or hosting bill for this step. |
| Show a checklist or supported CRM fields on a HubSpot record | In the app card, with no separate backend | Try the [checklist card](../examples/follow-up-checklist-card/README.md) and check HubSpot's [UI extension capabilities](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/overview). Never put a key in the card. The separate Contact Brief example uses a backend. |
| Try the included backend inside HubSpot on a test record | A mock backend on this computer, reached by [HubSpot's local dev proxy](first-live-test.md) | No external host. Both local processes must be running; the browser may ask for site-level local network access. This is not a shared app. |
| Run a small server-side operation from HubSpot without managing another host | A [HubSpot project function](https://developers.hubspot.com/docs/apps/developer-platform/add-features/serverless-functions/overview), where supported | Check your project version, plan, function limits, and authentication. Use Developer Projects, not legacy Design Manager functions; see [migration notes](MIGRATION.md). |
| Reach another service with a secret, serve users while your computer is off, or handle callbacks that need a reachable URL | An approved hosted backend, if the HubSpot-managed option doesn't fit | Check HTTPS, permission checks, secrets, storage, costs, and who will operate it. Start with the host your team already approves. |

For example, a card that shows a lead checklist might need no separate service.
A card that asks an external system for delivery status needs server-side code
to protect that system's key. The need is the protected lookup, not a particular
provider. Check if HubSpot can run it before signing up elsewhere.

## Compare External Options

| Option | Why someone might pick it | What to verify before choosing |
| --- | --- | --- |
| [Cloudflare Workers](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) | Your team already uses Workers, or the feature fits a request handler | Runtime compatibility and adapter, secret bindings, storage if needed, limits and logs. |
| [Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js) | Your team already uses Vercel, or wants a Node.js function | Function entry point, request body and signature handling, limits, storage and logs. |
| An existing approved Node.js service or container | You already operate a normal HTTP server and want to reuse that setup | Server maintenance, HTTPS, updates, isolation and rollback. Reuse only if the data and permissions fit. |

These are choices to evaluate, not tested deployment targets or endorsements.
The local sample listens on loopback. Do not upload it as-is or change the bind
address just to get it online. A serverless host can require a different handler,
and a production service needs caller, account, user and record authorization.
OAuth is an [authentication choice](auth-options.md), not a hosting provider;
evaluate it separately for installation, scopes and protected token storage.

## Decide With Your AI

Ask the assistant to explain, in plain language:

1. What can stay inside HubSpot, and what work would require a backend?
2. If a backend is needed, can I test it locally or reuse a service I already have?
3. For the viable options, what data leaves HubSpot, where do secrets stay,
   what could it cost, and who will maintain it? Check current official limits,
   billing, timeouts, access and rollback; say what is still unknown.
4. What is the smallest test with made-up data, and what must I approve first?

Use the [AI decision prompt](../.github/prompts/choose-auth-and-hosting.prompt.md)
to compare options. Choosing a host does not authorize creating an account,
spending money, opening a tunnel, deploying, or sending CRM data to that host.
