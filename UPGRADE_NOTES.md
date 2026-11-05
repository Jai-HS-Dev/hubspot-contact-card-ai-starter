# Local Upgrade Notes

## v0.2.0 - Guided Starter Release

This release adds a single beginner walkthrough, example/evidence labels, aligned
AI entry points, safe recovery steps and regression checks. It remains a blueprint
with small local examples, not a finished production integration. Review the
behavior changes below before updating an existing implementation.

Reviewed 2026-11-04. No app was uploaded or deployed by this update.

- The Contact Brief example now has hsproject.json and app/card metadata matching
  the reviewed 2026.09 schemas. Preserve your existing UIDs when migrating an app.
- The backend is mock-first and loopback-only. Live mode requires app signing
  credentials, exact account/app identity and an explicitly approved user list.
- The old CONTACT_BRIEF_SHARED_SECRET card mechanism is removed. Do not move it
  into a browser Authorization header; use HubSpot request signatures instead.
- PUBLIC_ORIGIN must match the actual HTTPS origin without a trailing slash/path.
  Do not reconstruct it from untrusted Host/Forwarded headers.
- Workflow/tool metadata moved to reference/contact-brief-action.example.json,
  outside the uploaded source. This card backend does not authenticate those callers.
- The React view is in ContactBriefView.js; ContactBriefCard.jsx is the entrypoint.
- Install the reviewed UI lockfile with npm ci --ignore-scripts in its cards folder
  before root npm test. Smoke/backend checks alone need no packages.
- The optional basic serverless example remains illustrative, not a complete project.

See the example README for caller/record authorization limits and the developer
trial steps. MIT LICENSE is unchanged. EVIDENCE.md records verification limits.
