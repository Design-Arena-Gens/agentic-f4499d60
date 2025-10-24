import { NextRequest, NextResponse } from 'next/server';
import { sendText } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { to, text } = body as { to?: string; text?: string };
  if (!to || !text) return NextResponse.json({ error: 'Missing to/text' }, { status: 400 });
  try {
    const result = await sendText({ to, text });
    return NextResponse.json({ ok: true, result });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
