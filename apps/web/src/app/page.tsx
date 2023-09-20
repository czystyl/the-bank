import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-1 flex-col items-center justify-center bg-gradient-to-b from-gray-500 to-gray-800 md:flex-row ">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-8xl font-extrabold text-transparent">
          The Bank
        </h1>

        <h2 className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-2xl font-extrabold text-transparent">
          Today, tomorrow in the future
        </h2>
      </div>

      <div className="flex flex-1 items-center justify-center border-gray-400 md:border-l-2">
        <SignedIn>
          <div className="flex flex-col gap-4">
            <UserButton
              showName
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-20 w-20",
                  userButtonBox: "flex flex-col-reverse ",
                  userButtonOuterIdentifier: "text-2xl text-gray-300",
                },
              }}
            />
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">Go to dashboard</Button>
            </Link>
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </main>
  );
}
