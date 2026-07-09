"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Profile",
      href: "/admin/profile",
      icon: UserCircle,
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside
      className="
    fixed left-0 top-0
    h-screen w-72
    flex flex-col
    border-r border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    transition-all duration-300
  "
    >
      {/* Logo */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl
              bg-blue-600
              text-white
              shadow-lg
            "
          >
            <ShieldCheck size={28} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              RBAC Admin
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={`
                    group relative flex items-center gap-3
                    rounded-xl px-4 py-3
                    font-medium
                    transition-all duration-300
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                  )}

                  <Icon
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center justify-center gap-3
            rounded-xl
            bg-red-500
            px-4 py-3
            font-semibold
            text-white
            shadow-md
            transition-all duration-300
            hover:bg-red-600
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
