# First Test Inside HubSpot

> **Status:** written 2026-11-10 from HubSpot's official documentation. The
> maintainer has **not yet run these steps end to end**. Use them as a checklist
> to confirm, not as a guarantee, and record what really happened.

## What This Is

The made-up data demo on your computer proves nothing about HubSpot. This is the
smallest real test: the sample card showing made-up data on one test contact, in
a free developer test account. It reads nothing sensitive and writes nothing.
It is optional. You can learn a lot and stop before this step.

## Before You Start

- [ ] You finished [the walkthrough](start-here.md) and the mock example passed.
- [ ] You have a developer test account that holds no real customer data. See
      [choosing where to test](connect-to-hubspot.md).
- [ ] The account owner approves three things, for that test account only:
      installing HubSpot's command-line tool on this computer, signing in to the
      test account, and uploading this example project to it.

If any box is unchecked, stop here. Nothing is wrong; you are simply not ready.

## Steps

1. **Read the example's trial section.**
   [Configure a developer-account trial](../examples/contact-card-with-agent-tool/README.md#configure-a-developer-account-trial)
   lists the placeholders you must replace and what must never go into card files.
2. **Set up HubSpot's official tools.** Follow HubSpot's
   [command-line install guide](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/install-the-cli),
   or the [Build with AI quickstart](https://developers.hubspot.com/docs/build-with-ai/quickstart)
   if you work with an AI assistant. Sign-in happens in your browser. Never paste
   a key or password into an AI chat. Before continuing, confirm that the account
   the tool selected is your test account.
3. **Validate before you upload.** In the example folder, run HubSpot's project
   validation (`hs project validate`; `hs project --help` lists the current
   commands). Fix what it reports instead of skipping it. One thing to check:
   this example's card file uses `"objectTypes": ["CONTACT"]`, while HubSpot's
   official card template uses `["contacts"]`. Use the value that validation and
   the current documentation accept, and write down which one worked.
4. **Keep the backend on made-up data.** For this first trial the card should
   show sample data only. A card cannot call `localhost` directly; HubSpot
   documents a local proxy for development. A public tunnel or a hosted backend
   is a separate approval.
5. **Upload to the test account and open one test contact.** This is step 7 in
   the example's trial section. Success is the card showing `Status: sample` on
   a test contact, for a user you approved.
6. **Write down what happened,** using the template below.

## Record The Result

Keep the full note private. Add only a short, cleaned-up summary to
[EVIDENCE.md](../EVIDENCE.md).

```text
Date:
Tested by (role, not a name):
Account type: developer test account
Platform version in hsproject.json:
Tool versions (Node.js, HubSpot command-line tool):
Validation result:
What I saw on the test contact:
What I had to change to make it work:
Not tested:
```

Leave out account IDs, people's names, keys, and screenshots of real records.

## If Something Fails

Stop and read [troubleshooting](troubleshooting.md). Do not switch off signature
checks, ask for wider permissions, or move to your everyday business account to
get past an error. HubSpot's guide on
[managing your project](https://developers.hubspot.com/docs/build-with-ai/best-practices/managing-your-project)
covers validation and going back to an earlier build.

## What This Does Not Prove

A working card in a test account is a learning milestone. It is not a security
review and not approval for real customers. Before real use, go through the
[live-use checklist](../REAL_TOOL_CHECKLIST.md) and
[implementation responsibility](implementation-responsibility.md).
