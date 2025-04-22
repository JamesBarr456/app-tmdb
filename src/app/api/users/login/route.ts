import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    return NextResponse.json({ message: 'Usuario autenticado', uid });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}
