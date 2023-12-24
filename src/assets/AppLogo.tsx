import Image from "next/image";
import Link from "next/link";

const AppLogo = () => {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <Image src="/images/logo.png" alt="Company Logo" width={35} height={30} />
      <span className="flex flex-col text-black">
        <span className="font-bold">Quick Startup</span>
        <span className="uppercase tracking-[0.2em] text-xs">
          business registry inc.
        </span>
      </span>
    </Link>
  );
};

export default AppLogo;
