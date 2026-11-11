# HubSpot Contact Card AI Starter

Learn to build a card that shows useful information on a HubSpot contact record.
You start with made-up data on your own computer, with an AI assistant that
follows written safety rules.

> [!WARNING]
> **This is a learning starter, not finished software.** It is not
> security-audited, not made or endorsed by HubSpot, and has no warranty or
> support promise. Practice with made-up data or a free HubSpot developer test
> account. You are responsible for what you build. See the [disclaimer](#disclaimer).

## What You Get

- A small working example that returns a sample "contact brief" from made-up data.
- Rules for your AI assistant ([AGENTS.md](AGENTS.md)): what it must never do, and
  when it must ask you first.
- A path from practice, to a test account, to a checklist before anything real.

![Local preview of the sample card: a title, a Refresh button, a sample brief, a next step and a status, under a notice that the data is made up and this is not HubSpot](docs/img/sample-card-preview.png)

This picture is the local preview page from `npm run preview`. It is a sketch
with made-up data, not a screenshot of a card installed in HubSpot.

## Pick Your Path

| You are | Start here | You will have |
| --- | --- | --- |
| New to coding | [Step-by-step walkthrough](docs/start-here.md) | The sample running on your computer and a plan for your own card |
| Building with an AI assistant | [The first prompt to paste](START_WITH_AI.md) | An assistant that explains each step and asks before risky ones |
| A developer | [Architecture](docs/developer-architecture.md), [data contract](docs/contracts/contact-card-data-contract.md), [example](examples/contact-card-with-agent-tool/README.md) | The code map, request and response shapes, and tests |

A word you do not know? See the [glossary](docs/glossary.md).

## Try It

You need [Node.js](https://nodejs.org/en/download) 22 or newer and a terminal.
You do **not** need a HubSpot account, a password or key, or any package install.

1. On GitHub choose **Code > Download ZIP**, extract it, and open a terminal in
   the folder that contains `README.md`.
2. Run these two commands (in Windows PowerShell type `npm.cmd` instead of `npm`):

   ```bash
   npm run doctor
   npm run smoke:example
   ```

3. You are done when the last line says `card smoke example passed.`
4. Optional: run `npm run preview`, then open the file it names in your browser
   to see the sample as a page.

**What just happened:** a small program on your computer answered with a made-up
contact brief and stopped itself. Nothing was sent to HubSpot and no card was
installed. If a command fails, stop and read [troubleshooting](docs/troubleshooting.md).
Never switch off a check or type in real credentials to make it pass.

## What To Do Next

1. **Change one small thing:** the [worked exercise](docs/worked-example.md).
2. **Plan your own card:** the [blueprint](docs/contact-card-blueprint.md).
3. **Understand accounts and sign-in choices:** the
   [connection guide](docs/connect-to-hubspot.md). Your assistant must ask you
   before it connects anything.
4. **Try it in a free HubSpot developer test account:** the
   [first test inside HubSpot](docs/first-live-test.md) checklist.
5. **Before real customers or real data:** the
   [live-use checklist](docs/REAL_TOOL_CHECKLIST.md). That is a separate decision.

## How This Fits With HubSpot's Own Tools

HubSpot's official tools create and upload real projects: see the
[Build with AI quickstart](https://developers.hubspot.com/docs/build-with-ai/quickstart)
and the [official project templates](https://github.com/HubSpot/hubspot-project-components).
This starter covers what comes before and around them: practice with made-up
data, rules for your AI assistant, and a checklist before going live. It does
not replace the official tools or documentation.

```mermaid
flowchart LR
  A["Card inside HubSpot<br/>never holds secrets"] -->|signed request| B["Your backend<br/>secrets stay here"]
  B --> C{"Mock mode?"}
  C -->|"yes (default)"| D["Made-up data"]
  C -->|"no, only after you approve"| E["HubSpot API<br/>test account first"]
```

## Safety Rules In Short

1. Keep passwords, keys and customer data out of AI chats, GitHub, screenshots
   and logs. Credentials belong on the server side, never in card code.
2. Start with made-up data. Approve the exact account, access and action before
   anything touches a real HubSpot account.

More: [security in plain English](docs/security-for-non-developers.md) and
[the approval steps](docs/non-developer-safety-gates.md).

## For Developers

Run `npm run check:ai`, `npm run check`, `npm run test:core` (no packages) and
`npm test` (full suite; it stops with setup instructions if the optional UI
packages are missing). [docs/EVIDENCE.md](docs/EVIDENCE.md) records what was and was not
tested. Reference: [compatibility](docs/COMPATIBILITY.md),
[authentication](docs/auth-options.md), [hosting](docs/hosting-options.md),
[which starter you need](docs/choose-your-path.md), [migration notes](docs/MIGRATION.md)
and [upgrade notes](docs/UPGRADE_NOTES.md).

## Disclaimer

- **No warranty.** Provided "as is" under the [MIT License](LICENSE), which
  disclaims warranties and limits the authors' liability. Keep the copyright
  and license notice when you reuse the code.
- **A starter, not a product.** The examples are not production-ready, not
  security-audited, and not verified in a live HubSpot account. A passing test
  here does not prove that what you build is secure.
- **You are responsible for what you build:** testing, security, privacy, legal
  compliance, costs and your customers' data. See
  [implementation responsibility](docs/implementation-responsibility.md).
- **Independent project.** Not affiliated with, endorsed by or supported by
  HubSpot. HubSpot is a trademark of HubSpot, Inc.
- **Not professional advice.** Nothing here is legal, security or compliance
  advice. HubSpot's platform changes, so check the current official documentation.

Help is best-effort with no response-time promise: see [support](docs/SUPPORT.md).
Report security problems privately through [SECURITY.md](SECURITY.md).
