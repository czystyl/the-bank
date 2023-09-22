import type { Metadata } from "next";
import { UserButton } from "@clerk/nextjs";
import dayjs from "dayjs";

import { ModeToggle } from "~/components/ModeToggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { serverAPIClient } from "~/utils/serverAPIClient";

export const metadata: Metadata = {
  title: "Users",
  description: "Example users app built using the components.",
};

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const user = (await serverAPIClient().admin.allUsers()).find(
    (user) => user.id === +params.id,
  );

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent">
            The Bank
          </h1>

          <div className="ml-auto flex items-center space-x-4">
            <UserButton />
            <ModeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2>User id: {params.id}</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Clerk ID</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={user.clerkId}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.clerkId}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell className="text-right">
                {dayjs(user.createdAt).format("YYYY-MM-DD")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
