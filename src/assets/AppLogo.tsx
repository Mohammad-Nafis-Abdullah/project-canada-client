import Image from "next/image";
import Link from "next/link";
import { Global } from "~/utils/const";

const AppLogo = () => {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <Image src="/images/logo.png" alt="Company Logo" width={35} height={30} />
      <span className="flex flex-col text-black">
        <span className="font-bold">{Global.APP_NAME}</span>
        <span className="uppercase tracking-[0.2em] text-xs">
          {Global.DESCRIPTION}
        </span>
      </span>
    </Link>
  );
};

export default AppLogo;
