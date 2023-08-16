import { ModeToggle } from "~/components/ModeToggle";
import { Button } from "~/components/ui/button";
import Hello from "./hello";

export default function HomePage() {
  return (
    <div className="mt-20 flex justify-center gap-10">
      <ModeToggle />
      <Button>Testing button text</Button>
      <Hello />
    </div>
  );
}
