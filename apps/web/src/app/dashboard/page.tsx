import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "~/components/ModeToggle";
import { Button } from "~/components/ui/button";
import Hello from "./hello";

export default function HomePage() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-10">
      <UserButton afterSignOutUrl="/" />

      <ModeToggle />
      <Button>Testing button text</Button>
      <Hello />
    </div>
  );
}
