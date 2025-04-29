import {
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/config/firebase';
import { auth as authAdmin } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

// Registro

class AuthService {
  async register({ email, password }: { email: string; password: string }) {
    const userRecord = await authAdmin.createUser({
      email,
      password,
    });
    return userRecord;
  }

  async login({ email, password }: { email: string; password: string }) {
    // 🔐 Establece la persistencia antes de iniciar sesión
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    // Guardar el token en la cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

    return { success: true };
  }
  async logout() {
    const cookieStore = await cookies();

    try {
      await firebaseSignOut(auth);

      cookieStore.delete('token');

      // const token = cookieStore.get('token')?.value;
      // if (token) {
      //   await authAdmin.revokeRefreshTokens(
      //     await authAdmin.verifyIdToken(token)
      //   );
      // }

      return { success: true };
    } catch (error) {
      console.error('Error en logout:', error);
      throw new Error('Error al cerrar sesión');
    }
  }

  // Método adicional recomendado para verificación de sesión
  async getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
      const decodedToken = await authAdmin.verifyIdToken(token);
      return await authAdmin.getUser(decodedToken.uid);
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      cookieStore.delete('token');
      return null;
    }
  }
}
export const authService = new AuthService();
