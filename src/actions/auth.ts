'use server';

import { loginSchema, registerSchema } from '@/schemas/auth';

import { AxiosError } from 'axios';
import { authService } from '../services/auth-service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerAction(_: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const registerData = {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  const validatedFields = registerSchema.safeParse(registerData);

  if (!validatedFields.success) {
    const errorDetails = validatedFields.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return { error: errorDetails };
  }

  const { confirmPassword, ...newPatient } = validatedFields.data;
  void confirmPassword;

  try {
    const user = await authService.register(newPatient);
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(_: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const loginData = {
    email: data.email,
    password: data.password,
  };

  const validatedFields = loginSchema.safeParse(loginData);

  if (!validatedFields.success) {
    const errorDetails = validatedFields.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    return { error: errorDetails };
  }

  try {
    // Aca se ejecuta la funcion de services del llamado api
    //   const resp = await login(validatedFields.data);
    return {
      data: validatedFields.data,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || error.message };
    } else if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Ocurrió un error inesperado' };
  }
}
