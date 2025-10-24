import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <div>
          <h1>WhatsApp Agent</h1>
          <p className="small">Join groups and talk as a person via a programmable agent.</p>
        </div>
        <div className="card">
          <h3>Get Started</h3>
          <ul>
            <li><Link href="/setup">Setup WhatsApp connection</Link></li>
            <li><Link href="/console">Agent console</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
