# AI Customization Notes

When adapting these contact-card examples:

1. Ask whether the user wants the serverless path or the agent-tool backend path.
2. Keep mock responses until the user confirms they are ready for real data.
3. Do not ask the user to paste secrets into chat.
4. Replace `https://your-host.example.com` only after the user has a real HTTPS endpoint.
5. Keep tokens and external API keys server-side.
6. Do not log full contact records.

Useful first prompt:

```text
Read this contact-card example and help me choose between serverless and agent-tool-backed architecture. Ask one question at a time.
```
