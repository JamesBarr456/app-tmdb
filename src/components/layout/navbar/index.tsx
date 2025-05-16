import Avatar from './avatar';
import Image from 'next/image';
import { NavbarLinks } from './links';

export const Navbar = async () => {
  return (
    <nav className="bg-background p-4 lg:h-full bg-semi-dark-blue md:rounded-lg lg:rounded-xl">
      <div className="flex flex-row lg:flex-col items-center justify-between lg:space-y-4 lg:h-full">
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

        <NavbarLinks />

        <Avatar />
      </div>
    </nav>
  );
};
