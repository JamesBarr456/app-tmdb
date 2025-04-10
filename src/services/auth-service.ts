import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/config/firebase';

// Registro

class AuthService {
  async register({ email, password }: { email: string; password: string }) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }

  async login({ email, password }: { email: string; password: string }) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }
}
export const authService = new AuthService();
