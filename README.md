# WhatsApp Agent

A Next.js app that connects to a WhatsApp provider (WHAPI compatible) to join groups and chat like a person using LLM replies.

## Environment variables

- `PROVIDER_API_KEY`: API key for provider
- `PROVIDER_PHONE_ID`: Sender phone/account id
- `WEBHOOK_VERIFY_SECRET`: Shared secret for webhook verification
- `OPENAI_API_KEY`: Optional for better replies
- `AGENT_NAME`: Optional name (default Aiden)

## Local dev

```bash
npm install
npm run dev
```

Set a public URL for webhooks (use `ngrok http 3000`) and configure your provider to call `https://YOUR_URL/api/webhook`.

## Deploy

Deploy to Vercel and set the environment variables above. The production webhook endpoint is `/api/webhook`.
