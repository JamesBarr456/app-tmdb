'use client';

import { Eye, EyeClosed } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { LoginFormType, loginSchema } from '@/schemas/schema-auth';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { loginAction } from '@/actions/auth';
import { useAuth } from '@/context/auth-context';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { SpinnerLoading } from '../loading/spinner';
function FormLogin() {
  const { refreshAuth } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(loginAction, {});
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (state.success) {
      refreshAuth().then(() => router.push('/home'));
      return;
    }
    // Manejar errores de validación de campos
    if (state.errors?.length) {
      state.errors.forEach(({ field, message }) => {
        if (field) {
          form.setError(field as keyof LoginFormType, { message });
        }
      });
      return;
    }
    // Manejar errores generales
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error.message,
      });
    }
  }, [state, form, toast, refreshAuth, router]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-5 mb-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-0">
              <FormLabel className="opacity-50">Email address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={cn(
                      'border-0 border-b rounded-none caret-bright-red focus-visible:ring-0 transition-colors',
                      fieldState.error
                        ? 'border-b-red-500'
                        : 'border-b-greyish-blue'
                    )}
                    type="email"
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
            <FormItem className="space-y-0">
              <FormLabel className="opacity-50">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={cn(
                      'border-0 border-b rounded-none caret-bright-red  focus-visible:ring-0 transition-colors',
                      fieldState.error
                        ? 'border-b-red-500'
                        : 'border-b-greyish-blue'
                    )}
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-greyish-blue hover:bg-transparent  hover:text-bright-red"
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
        <Button
          type="submit"
          className="w-full py-4 bg-bright-red hover:bg-white hover:text-dark-blue font-light"
          disabled={!form.formState.isValid || isPending || state.success}
        >
          {isPending ? (
            <SpinnerLoading color="white" />
          ) : (
            'Login to your account'
          )}
        </Button>
      </form>
    </Form>
  );
}

export default FormLogin;
