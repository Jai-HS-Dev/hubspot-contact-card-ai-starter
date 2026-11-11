# Start With AI

You can start with the public GitHub link. You do not need a HubSpot login,
credentials, an MCP connection or a hosting account for the first exercise.

| What your assistant can do | How to start |
| --- | --- |
| Read GitHub links | Paste the prompt below with the public repository link. Ask it to name the files it could read. |
| Read project folders | Download the public repository ZIP, extract it, and open that folder in your coding tool. Then paste the prompt. |
| Only read chat or attachments | Share the public `README.md`, `START_WITH_AI.md` and `AGENTS.md`. Share the public walkthrough if asked. Never attach a private project, `.env` file or CRM export. |

Use the same version for your download and the files your assistant reads. If
you downloaded a release ZIP, share its link to this prompt or use the public
files from your extracted folder. Don't silently switch to the default branch.
If the assistant cannot run commands, run them yourself and share only the
success line or a sanitized error.

```text
Help me use the HubSpot Contact Card AI Starter. This is a guided starter, not a production integration.
Public repository: https://github.com/Jai-HS-Dev/hubspot-contact-card-ai-starter

First read AGENTS.md, README.md and docs/start-here.md. If you can't read them,
say which file you need. Don't guess at repository commands or claim you ran them.

Start by asking me: "What should someone see or do on the contact card?"
If I don't have an idea yet, offer the supplied example. Explain terms as needed.
Use the first build-along in the local walkthrough. State my goal, the expected
result, and what needs separate approval before any HubSpot or hosting step.
Explain the command, where to run it,
and the line or screen that means it worked. If I can't run it yet, help me plan
from the example and mark the result as not run.

When I can recognize the sample result, propose one small change, the file to
edit, and how to check it. Read the relevant contract and example README before
editing. Keep the local sample working.

Before recommending a service, use docs/hosting-options.md to explain what work
needs a backend, what can stay inside HubSpot, and whether a local test or an
existing approved host is enough. If a new host is needed, ask what I prefer.
Compare setup, data exposure, costs and maintenance before I choose.

Follow AGENTS.md. No secrets or customer data in chat. Sharing this repo is not
approval to install packages, sign in, change permissions, publish, deploy, or
touch live data. Finish with what actually ran, what is still unverified, and
one next decision.
```

**Try saying:** "Show a checklist that reminds me what to confirm before I follow up."

**First finish line:** Run `npm run build:example` using [the walkthrough](docs/start-here.md).
Look for `Sample follow-up checklist`. See the checklist in the terminal, change one item, and see the new wording. It has not been installed in HubSpot.

**A later decision:** [Try the same checklist in a developer test account](examples/follow-up-checklist-card/README.md#2-see-it-on-a-hubspot-record) only after approving the app install, Contacts read permission, and test view.

**Optional:** [Try the separate Contact Brief backend mock](docs/worked-example.md) if you want dynamic data.

Report actual results separately from instructions or plans. See
[what was tested](docs/EVIDENCE.md) for this starter's verification limits.

[AGENTS.md](AGENTS.md) holds the operating instructions; README.md explains scope.
Client-specific files should point there, not maintain competing rule sets.
No particular AI subscription, HubSpot CLI or MCP connection is required for the mock demo.
