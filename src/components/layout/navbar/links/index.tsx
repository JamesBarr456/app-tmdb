'use client';

import { useAuth } from '@/context/auth-context';
import { routes } from '@/routes/routes-navbar-pages';
import Link from 'next/link';

export const NavbarLinks = () => {
  const { isAuthenticated } = useAuth();

  const filteredRoutes = routes.filter((route) => {
    if (route.path === '/favorites') {
      return isAuthenticated;
    }
    return true;
  });

  return (
    <ul className="flex gap-6 md:gap-8 lg:flex-col lg:gap-12">
      {filteredRoutes.map(({ icon: Icon, path }) => (
        <li
          key={path}
          className="hover:text-white text-greyish-blue hover:scale-125 transition-all ease-out duration-300"
        >
          <Link href={path}>
            <Icon />
          </Link>
        </li>
      ))}
    </ul>
  );
};
