# Hosting Options

These starters are hosting-neutral. Pick the smallest safe option for your use case.

## Mock-Only Local Prototype

Best for learning and AI-assisted editing. No real HubSpot data, no deployment, and no secrets are required.

## HubSpot Serverless Functions

Best for simple HubSpot project logic that can live inside HubSpot's app project model. This is often the simplest option for app cards that need lightweight backend behavior.

Use Developer Projects, not legacy Design Manager functions. Project functions
on platform `2026.03` or `2026.09` use HubSpot-managed Node.js 24. The legacy
`/_hcms/api/` surface has separate retirement dates listed in `../MIGRATION.md`.
Confirm current product entitlements and function metadata before deploying the
mock example. External hosting and OAuth remain valid choices where needed.

## External Serverless Functions

Good for endpoints hosted on Vercel, Netlify, Cloudflare Workers, AWS Lambda, Azure Functions, Google Cloud Functions, or similar platforms.

Use this when you need public HTTPS endpoints, custom auth, external APIs, or logic that should live outside HubSpot project files.

## Long-Running Node Service

Good for Railway, Render, Fly.io, a VPS, containers, or platforms where a normal HTTP server is easier than serverless functions.

## OAuth-Backed Service

Best for real apps installed by multiple HubSpot accounts. OAuth requires a server-side callback, secure token storage, refresh handling, uninstall/revoke handling, and careful scope choices.

## Check For Any Host

Before deploying, confirm:

- how secrets are stored
- how environment variables are set
- how logs are viewed and retained
- how HTTPS is handled
- how deployment rollback works
- how token storage is protected
- how rate limits and abuse controls are handled

## Choosing Quickly

- Learning: mock-only local prototype.
- Simple contact card: HubSpot serverless function.
- Tool endpoint: external serverless function.
- Multi-account app: OAuth-backed service.
- Unsure: ask the AI to use `choose-auth-and-hosting.prompt.md`.
