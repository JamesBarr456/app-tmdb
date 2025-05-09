'use client';

import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};
