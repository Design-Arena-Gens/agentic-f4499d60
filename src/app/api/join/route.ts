import { NextRequest, NextResponse } from 'next/server';
import { joinGroup } from '@/lib/whatsapp';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { inviteCode } = body as { inviteCode?: string };
  if (!inviteCode) return NextResponse.json({ error: 'Missing inviteCode' }, { status: 400 });
  try {
    const result = await joinGroup({ inviteCode });
    return NextResponse.json({ ok: true, result });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
