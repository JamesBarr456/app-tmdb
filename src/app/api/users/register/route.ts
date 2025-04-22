import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  const { email, password, displayName } = await request.json();

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    return NextResponse.json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 400 }
    );
  }
}
