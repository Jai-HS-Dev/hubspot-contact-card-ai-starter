# Choose Your Path

## Path A: Simple Card

Use this when the card can show static or non-sensitive data.

- Start with placeholder data.
- Keep the UI simple.
- Avoid unnecessary auth.

## Path B: Serverless Function

Use this when the card needs backend logic but can stay inside the HubSpot project model.

- Keep secrets server-side.
- Validate input.
- Limit logs.

## Path C: OAuth-Backed Card

Use this when the card needs reusable app authorization, external account linking, or multi-account access.

- Use a backend OAuth service.
- Store tokens server-side only.
- Add install, setup, revoke, and error states.

