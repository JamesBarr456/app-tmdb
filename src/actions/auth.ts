'use server';

import { loginSchema, registerSchema } from '@/schemas/schema-auth';
import { authService } from '../services/service-auth';
import { FormState } from '@/types/error';
import { handleAuthError } from '@/utils/auth-error';

const { login, register, logout, getCurrentUser } = authService;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerAction(_: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData.entries());

  const registerData = {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  const validatedFields = registerSchema.safeParse(registerData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors.map((err) => ({
        field: err.path[0] as string,
        message: err.message,
      })),
    };
  }

  const { confirmPassword, ...newUser } = validatedFields.data;
  void confirmPassword; // 👌 para que no se queje eslint

  try {
    await register(newUser);
    return {
      success: true,
    };
  } catch (error) {
    return handleAuthError(error);
  }
}


export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData.entries());
  const loginData = {
    email: data.email as string,
    password: data.password as string,
  };

  // Validación con Zod
  const validatedFields = loginSchema.safeParse(loginData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors.map((err) => ({
        field: err.path[0] as string,
        message: err.message,
      })),
    };
  }

  try {
    await login(validatedFields.data);
    return { success: true };
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function logoutAction() {
  try {
    const result = await logout();
    return result;
  } catch (error) {
    console.error('Error en logoutAction:', error);
    return { success: false, error: 'No se pudo cerrar sesión' };
  }
}

export async function checkAuthAction() {
  const user = await getCurrentUser();
  return !!user;
}
