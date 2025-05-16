'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, User as UserLucide } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar as ShadAvatar } from '@/components/ui/avatar';
import { logoutAction } from '@/actions/auth';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

function Avatar() {
  const { isAuthenticated, loading, refreshAuth } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutAction();
      await refreshAuth();
      router.push('/home');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadAvatar className="w-8 h-8 border-2 border-white cursor-pointer flex items-center justify-center">
          {loading ? (
            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : isAuthenticated ? (
            <Image
              src="/images/image-avatar.png"
              alt="Avatar"
              width={32}
              height={32}
            />
          ) : (
            <UserLucide className="text-white" />
          )}
        </ShadAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/login" className="flex items-center">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
