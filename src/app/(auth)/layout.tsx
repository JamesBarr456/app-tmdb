import LogoIcon from '@/components/common/icons/icon-logo';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen mt-12 items-center px-5 gap-10">
      <LogoIcon />
      <div className="w-full md:w-[400px] bg-semi-dark-blue rounded-xl mx-5">
        <div className="flex flex-col p-6 text-white">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
