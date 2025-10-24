import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { sendText, type WebhookEvent } from '@/lib/whatsapp';
import { generateReply } from '@/lib/agent';

export async function GET(req: NextRequest) {
  // Verification endpoint for providers that require it
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode');
  const token = searchParams.get('token');
  const challenge = searchParams.get('challenge');
  const env = getEnv();
  if (mode === 'subscribe' && token === env.WEBHOOK_VERIFY_SECRET) {
    return new NextResponse(challenge ?? '', { status: 200 });
  }
  return new NextResponse('forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const env = getEnv();
    const event = (await req.json()) as WebhookEvent;

    if (event?.message?.body) {
      const msg = event.message;
      const reply = await generateReply(msg.body, {
        sender: msg.from,
        groupName: msg.isGroup ? (event.group?.name ?? 'Group') : 'DM',
      });

      const to = msg.isGroup && msg.chatId ? msg.chatId : msg.from;
      await sendText({ to, text: reply });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 200 });
  }
}
