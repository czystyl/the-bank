interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col">
      {`<ToDo Layout/ >`}
      {children}
    </div>
  );
}
