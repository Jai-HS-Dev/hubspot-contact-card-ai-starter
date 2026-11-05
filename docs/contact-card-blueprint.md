# Contact Card Blueprint

Copy this section into a new planning note before writing code.

## Card Name

`Example Contact Card`

## User Goal

What should the HubSpot user understand or do from the card?

## Data Needed

- HubSpot properties:
- External data:
- User-provided input:

## Authentication And Authorization

- Mock-only or real account trial:
- App installation auth (static/OAuth where supported):
- Backend caller validation and permitted account/user/record:
- Server-side HubSpot or external API credentials:
- Minimum fields and scopes:

Choose the runtime/host separately. A Service Key is not app-card installation
or user/record authorization; see [auth choices](auth-options.md).

## UI States

- loading
- success
- no data
- needs setup
- error

## Security Checks

- Do not expose tokens to browser code.
- Do not log full contact records.
- Do not show sensitive data unless the user needs it.
- Validate inputs before calling backend services.
- Keep errors helpful but limited.

## Acceptance And Limits

- One successful synthetic result:
- Empty/error/denied result:
- Files and tests to change:
- Unsupported or intentionally unfinished work:

