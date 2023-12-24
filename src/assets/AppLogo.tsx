import { Anchor } from "@mantine/core";
import Link from "next/link";

const AppLogo = () => {
  return (
    <Anchor component={Link} href="/">
      <div className="inline-flex items-center gap-3">
        <img src="/images/logo.png" alt="logo" className="w-10" />
        <span className="flex flex-col text-black">
          <span className="font-bold">Quick Startup</span>
          <span className="uppercase tracking-[0.2em] text-xs">
            business registry inc.
          </span>
        </span>
      </div>
    </Anchor>
  );
};

export default AppLogo;
