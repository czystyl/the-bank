import type { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { serverAPIClient } from "~/utils/serverAPIClient";

export const metadata: Metadata = {
  title: "Users",
  description: "Example users app built using the components.",
};

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UsersPage({ params }: UserPageProps) {
  const user = await serverAPIClient().admin.getUser({ clerkId: params.id });

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
            {user?.firstName} {user?.lastName}
          </CardTitle>
          <CardDescription>{user?.clerkId}</CardDescription>
        </CardHeader>
        <CardContent>
          <Avatar className="mx-auto h-[200px] w-[200px]">
            <AvatarImage src={user?.imageUrl} alt="Avatar" />
            <AvatarFallback>{user?.firstName?.at(0)}</AvatarFallback>
          </Avatar>
        </CardContent>
        <CardFooter>
          <p>Created at {dayjs(user?.createdAt).format("DD-MM-YYYY")}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
