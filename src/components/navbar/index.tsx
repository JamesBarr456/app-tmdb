import Image from "next/image";
import Link from "next/link";
import { routes } from "@/data/routes";

export const Navbar = () => {
  return (
    <nav className="bg-background p-4 lg:h-full bg-semi-dark-blue md:rounded-lg lg:rounded-xl">
      <div className="flex flex-row lg:flex-col items-center justify-between  lg:space-y-4 lg:h-full">
        {/* Logo */}
        <picture className="md:w-8 md:h-7">
          <Image
            alt="Logo-Entertaiment"
            src={"/icon/logo.svg"}
            width={32}
            height={26}
            sizes="(max-width: 768px) 32px"
            priority
          />
        </picture>
        {/* Pages */}
        <ul className="flex gap-6 md:gap-8 lg:flex-col lg:gap-12">
          {routes.map(({icon:Icon, path}) => (
            <li key={path} className="hover:text-white hover:scale-125 transition-all ease-out duration-300">
              <Link href={path} >
               <Icon />
              </Link>
            </li>
          ))}
        </ul>
        {/* User */}
        <picture>
          <Image
            alt="Avatar-Entertaiment"
            src={"/images/image-avatar.png"}
            width={32}
            height={32}
            sizes="(max-width: 768px) 32px"
            priority
            className="border-2 border-white rounded-full"
          />
        </picture>
      </div>
    </nav>
  );
};
