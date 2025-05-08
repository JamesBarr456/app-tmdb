import Avatar from '../avatar';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/data/routes';
import { checkAuthAction } from '@/actions/auth';

export const Navbar = async () => {
  const isAuthenticated = await checkAuthAction();

  const filteredRoutes = routes.filter((route) => {
    if (route.path === '/favorites') {
      return isAuthenticated;
    }
    return true;
  });

  return (
    <nav className="bg-background p-4 lg:h-full bg-semi-dark-blue md:rounded-lg lg:rounded-xl">
      <div className="flex flex-row lg:flex-col items-center justify-between  lg:space-y-4 lg:h-full">
        {/* Logo */}
        <picture className="md:w-8 md:h-7">
          <Image
            alt="Logo-Entertaiment"
            src={'/icon/logo.svg'}
            width={32}
            height={26}
            sizes="(max-width: 768px) 32px"
            priority
          />
        </picture>
        {/* Pages */}
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
        <Avatar />
      </div>
    </nav>
  );
};
