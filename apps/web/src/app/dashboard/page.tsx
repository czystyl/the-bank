import type { Metadata } from "next";
import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "~/components/ModeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TransactionsTab from "../transactions/TransactionsTab";
import UserTab from "../users/UserTab";
import OverviewTab from "./OverviewTab";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
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
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports" disabled about="elo">
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="space-y-4">
            <TransactionsTab />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <UserTab />
          </TabsContent>
          <TabsContent value="overview" className="space-y-4">
            <OverviewTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
