'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { RegisterFormType, registerSchema } from '@/schemas/auth';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { registerPatientAction } from '@/actions/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/lib/utils';

function FormRegister() {
  const [state, formAction, isPending] = useActionState(
    registerPatientAction,
    null
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (state?.success) {
      console.log(state.data);
      router.push('/login');
    } else if (state?.error) {
      console.log(state.error);
    }
  }, [state]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form action={formAction}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className={cn(
                        'border-0 border-b rounded-none focus-visible:ring-0 transition-colors',
                        fieldState.error ? 'border-b-red-500' : 'border-b-white'
                      )}
                      type="email"
                      placeholder="juan@example.com"
                      {...field}
                    />
                    <FormMessage className="absolute right-0 top-0 h-fulls -translate-x-8 translate-y-2" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className={cn(
                        'border-0 border-b rounded-none focus-visible:ring-0 transition-colors',
                        fieldState.error ? 'border-b-red-500' : 'border-b-white'
                      )}
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent  hover:text-bright-red"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                    <FormMessage className="absolute right-0 top-0 h-fulls -translate-x-8 translate-y-2" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Confirmar Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className={cn(
                        'border-0 border-b rounded-none focus-visible:ring-0 transition-colors',
                        fieldState.error ? 'border-b-red-500' : 'border-b-white'
                      )}
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-bright-red"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                    <FormMessage className="absolute right-0 top-0 h-fulls -translate-x-8 translate-y-2" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-4 bg-bright-red hover:bg-white hover:text-dark-blue font-light"
          >
            {isPending ? 'Loading' : 'Create on account'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormRegister;
