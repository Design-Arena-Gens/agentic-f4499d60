"use client";
import { useState } from 'react';

export default function SetupPage() {
  const [apiKey, setApiKey] = useState('');
  const [phoneId, setPhoneId] = useState('');
  const [webhookVerifySecret, setWebhookVerifySecret] = useState('');

  async function saveEnv(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, phoneId, webhookVerifySecret })
    });
    alert('Saved locally for this session. On Vercel set env vars.');
  }

  return (
    <main>
      <h2>Setup WhatsApp Provider</h2>
      <form className="container" onSubmit={saveEnv}>
        <div className="card">
          <label className="label">Provider API Key</label>
          <input className="input" value={apiKey} onChange={(e)=>setApiKey(e.target.value)} placeholder="WHAPI or Cloud API token"/>
        </div>
        <div className="card">
          <label className="label">Phone ID / Sender</label>
          <input className="input" value={phoneId} onChange={(e)=>setPhoneId(e.target.value)} placeholder="Your WhatsApp sender identifier"/>
        </div>
        <div className="card">
          <label className="label">Webhook Verify Secret</label>
          <input className="input" value={webhookVerifySecret} onChange={(e)=>setWebhookVerifySecret(e.target.value)} placeholder="Shared secret for webhook"/>
        </div>
        <button className="btn" type="submit">Save</button>
      </form>
    </main>
  );
}
