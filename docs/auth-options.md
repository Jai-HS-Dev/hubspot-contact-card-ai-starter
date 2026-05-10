# Auth Options

## No Auth

Use when the card shows safe static content or does not call private APIs.

## Serverless Function

Use when the card needs backend logic and the secrets can remain server-side.

Important:

- keep secrets out of browser code
- validate all input
- avoid logging private CRM data

## OAuth-Backed Service

Use when the card is part of a reusable app or needs account-level authorization.

The OAuth service should:

- validate `state`
- store tokens server-side
- request minimum scopes
- provide revoke or uninstall handling
- avoid exposing access tokens to the browser

