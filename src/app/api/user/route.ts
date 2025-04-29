import { NextResponse } from 'next/server';
import { auth as authAdmin } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false, user: null });
  }

  try {
    const decoded = await authAdmin.verifyIdToken(token);
    const user = await authAdmin.getUser(decoded.uid);

    // Agregar datos extra si los manejás en tu base de datos
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // Podés agregar más campos si los manejás por fuera de Auth
      },
    });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false, user: null });
  }
}
