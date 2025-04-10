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
import { registerAction } from '@/actions/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/lib/utils';

function FormRegister() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-0">
              <FormLabel className="opacity-50">Repeat Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={cn(
                      'border-0 border-b rounded-none caret-bright-red  focus-visible:ring-0 transition-colors',
                      fieldState.error
                        ? 'border-b-red-500'
                        : 'border-b-greyish-blue'
                    )}
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full text-greyish-blue px-3 py-2  hover:bg-transparent hover:text-bright-red"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
  );
}

export default FormRegister;
