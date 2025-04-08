import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email({
      message: 'Invalid email',
    }),
    password: z.string().min(8, {
      message: 'Invalid password',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type RegisterFormType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(8, {
    message: 'Invalid password',
  }),
});
export type LoginFormType = z.infer<typeof loginSchema>;
