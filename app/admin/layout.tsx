import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="ml-72 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
