import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function UsersPage() {
  return (
    <div className="mx-auto w-1/3">
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
          <Skeleton className=" mx-auto h-[200px] w-[200px] rounded-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-[20px] w-1/2 rounded-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
