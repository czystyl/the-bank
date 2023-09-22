import { Suspense } from "react";
import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TransactionsTab from "../TransactionsTab";
import UserTab from "../UserTab";
import OverviewTab from "./OverviewTab";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
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
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionsTab />
          </Suspense>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <UserTab />
          </Suspense>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <OverviewTab />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
