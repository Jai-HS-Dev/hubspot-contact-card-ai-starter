# Fall 2026 Feature Recipes

These are optional extensions. Keep the normal record card usable while evaluating beta surfaces.

## App Actions

App Actions are public beta and can receive one or more selected CRM record IDs from a list page.

Start with a read-only action. For writes:

- show the number and object type of selected records
- cap batch size
- preview the operation
- require confirmation
- use idempotency keys
- report per-record success and failure
- never place tokens in the React extension

Keep all privileged calls in the backend and put the feature behind `ENABLE_APP_ACTIONS=false`.

## Activity Auto Associations

This API is public beta. Keep explicit card-origin associations as the fallback and show the resulting linked records in the success state.

## User-Level Apps

Set `isUserLevel: true` only when the card must enforce each acting user's permissions. Test users with different CRM access and the Edit Associations permission. Do not enable it merely because it is newer.

## Required UI States

Build loading, empty, setup-required, permission-denied, validation-error, partial-success, success, and retry states before connecting real data.

