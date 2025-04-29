'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar as ShadAvatar } from '@/components/ui/avatar';
import { User as UserLucide } from 'lucide-react';
import { logoutAction } from '@/actions/auth';

function Avatar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(document.cookie.includes('token'));
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadAvatar className="w-8 h-8 border-2 border-white cursor-pointer">
          {isLogged ? (
            <UserLucide className=" text-gray-500" />
          ) : (
            <Image
              src="/images/image-avatar.png"
              alt="Avatar"
              width={32}
              height={32}
            />
          )}
        </ShadAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {!isLogged ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
