import type { Metadata } from "next";

import Header from "~/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
}
