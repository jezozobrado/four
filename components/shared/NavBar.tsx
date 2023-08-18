import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        <Link href={"/"}>
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white ">
            Four
          </p>
        </Link>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default NavBar;
