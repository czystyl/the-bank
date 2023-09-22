import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default async function TransactionsPage() {
  return (
    <div className="mx-auto w-1/4">
      <Link href="/dashboard">
        <div className="flex items-center">
          <ArrowLeft className="my-4 h-10 w-10" />
          Back
        </div>
      </Link>

      <Card className="text-center">
        <CardHeader>
          <CardTitle>
            <Skeleton className="mx-auto mt-3 h-[14px] w-full rounded-full" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="mx-auto h-[10px] w-1/2 rounded-full" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-4 flex items-center justify-between">
            <Skeleton className=" mx-auto h-[150px] w-[150px] rounded-full" />
            <ArrowRight />
            <Skeleton className=" mx-auto h-[150px] w-[150px] rounded-full" />
          </div>

          <div className="grid gap-2">
            <Skeleton className="mx-auto h-[20px] w-1/4 rounded-full" />
            <Skeleton className="mx-auto h-[20px] w-1/2 rounded-full" />
            <Skeleton className="mx-auto h-[20px] w-1/4 rounded-full" />
            <Skeleton className="mx-auto h-[20px] w-1/3 rounded-full" />{" "}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-[20px] w-1/2 rounded-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
