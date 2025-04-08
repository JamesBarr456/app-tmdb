import Image from 'next/image';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen mt-12 items-center px-5">
      <picture className="md:w-8 md:h-7 mb-14">
        <Image
          alt="Logo-Entertaiment"
          src={'/icon/logo.svg'}
          width={32}
          height={26}
          sizes="(max-width: 768px) 32px"
          priority
        />
      </picture>
      <div className="w-full  bg-semi-dark-blue rounded-xl">
        <div className="flex flex-col p-6 text-white">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
