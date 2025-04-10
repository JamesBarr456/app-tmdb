'use client';

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { LoginFormType, loginSchema } from '@/schemas/auth';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { loginAction } from '@/actions/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

function FormLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (state?.success) {
      console.log(state.data);
      router.push('/home');
    } else if (state?.error) {
      console.log(state.error);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="juan@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosedIcon className="h-4 w-4" />
                    ) : (
                      <EyeOpenIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-4 bg-bright-red hover:bg-white hover:text-dark-blue font-light"
        >
          {isPending ? 'Loading' : 'Login to your account'}
        </Button>
      </form>
    </Form>
  );
}

export default FormLogin;
