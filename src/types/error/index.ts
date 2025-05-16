export type FormError = {
  field?: string;
  message: string;
  code?: string;
};

export type FormState = {
  success?: boolean;
  errors?: FormError[];
  error?: FormError; // Para errores generales
};

export type AuthError = {
  code?: string;
  message: string;
};
