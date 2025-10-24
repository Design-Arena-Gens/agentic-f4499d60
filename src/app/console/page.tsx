"use client";
import { useEffect, useState } from 'react';

export default function ConsolePage() {
  const [to, setTo] = useState('');
  const [text, setText] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  async function sendMessage() {
    const res = await fetch('/api/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, text })
    });
    const j = await res.json();
    setLogs((l)=>[...l, `send -> ${JSON.stringify(j)}`]);
  }

  async function joinGroup() {
    const res = await fetch('/api/join', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode: joinCode })
    });
    const j = await res.json();
    setLogs((l)=>[...l, `join -> ${JSON.stringify(j)}`]);
  }

  return (
    <main className="container">
      <div className="card">
        <h3>Send message</h3>
        <div className="flex">
          <input className="input" placeholder="WhatsApp jid or phone" value={to} onChange={(e)=>setTo(e.target.value)} />
          <input className="input" placeholder="Hello world" value={text} onChange={(e)=>setText(e.target.value)} />
          <button className="btn" onClick={sendMessage}>Send</button>
        </div>
      </div>
      <div className="card">
        <h3>Join group via invite</h3>
        <div className="flex">
          <input className="input" placeholder="Invite code" value={joinCode} onChange={(e)=>setJoinCode(e.target.value)} />
          <button className="btn" onClick={joinGroup}>Join</button>
        </div>
      </div>
      <div className="card">
        <h3>Logs</h3>
        <pre>{logs.join('\n')}</pre>
      </div>
    </main>
  );
}
