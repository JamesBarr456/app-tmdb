import Avatar from './avatar';

import { NavbarLinks } from './links';
import LogoIcon from '@/components/common/icons/icon-logo';

export const Navbar = async () => {
  return (
    <nav className="bg-background p-4 lg:h-full bg-semi-dark-blue md:rounded-lg lg:rounded-xl">
      <div className="flex flex-row lg:flex-col items-center justify-between lg:space-y-4 lg:h-full">
        <LogoIcon />
        <NavbarLinks />
        <Avatar />
      </div>
    </nav>
  );
};
