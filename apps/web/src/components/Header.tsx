import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "~/components/ModeToggle";

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard">
          <h1 className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent">
            The Bank
          </h1>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
