'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputWithLabel = ({
  label,
  error,
  className,
  ...props
}: InputWithLabelProps) => {
  const [focused, setFocused] = useState(false);
  void focused;
  return (
    <div className="w-full space-y-1">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={props.name}
          className={cn('text-sm text-gray-400', error && 'text-red-500')}
        >
          {label}
        </Label>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      <Input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          'bg-transparent border-0 border-b border-gray-600 rounded-none px-0 focus:outline-none',
          'focus:border-white transition-colors placeholder:text-gray-500',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
      />
    </div>
  );
};
