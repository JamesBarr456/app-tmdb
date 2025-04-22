import { auth } from '@/config/firebase';
import { auth as authAdmin } from '@/lib/firebase/admin';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    return { user: userCredential.user, token };
  }
}
export const authService = new AuthService();
