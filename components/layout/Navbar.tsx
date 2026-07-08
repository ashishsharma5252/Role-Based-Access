"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname === "/admin/users") return "Users";
    if (pathname === "/admin/profile") return "Profile";

    return "Admin Panel";
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {getTitle()}
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2">

          <UserCircle
            size={42}
            className="text-blue-600"
          />

          <div>
            <h2 className="font-semibold text-slate-800">
              Admin
            </h2>

            <p className="text-sm text-slate-500">
              admin@gmail.com
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}