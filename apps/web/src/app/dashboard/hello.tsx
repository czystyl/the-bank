"use client";

import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

export default function Hello() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: new Date().toLocaleTimeString(),
        });
      }}
    >
      TOAST
    </Button>
  );
}
