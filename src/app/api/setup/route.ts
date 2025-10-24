import { NextRequest, NextResponse } from 'next/server';

let memory: Record<string, string> = {};

export async function POST(req: NextRequest) {
  const body = await req.json();
  memory = {
    PROVIDER_API_KEY: body.apiKey,
    PROVIDER_PHONE_ID: body.phoneId,
    WEBHOOK_VERIFY_SECRET: body.webhookVerifySecret,
  };
  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(memory);
}
