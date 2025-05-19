import Image from 'next/image';

export default function LogoIcon() {
  return (
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
  );
}
