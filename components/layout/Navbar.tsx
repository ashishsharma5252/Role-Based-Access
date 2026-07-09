"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Bell, Search, UserCircle, Menu, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTitle = () => {
    switch (pathname) {
      case "/admin":
        return "Dashboard";

      case "/admin/users":
        return "Users";

      case "/admin/profile":
        return "Profile";

      default:
        return "Admin Panel";
    }
  };

  const getDescription = () => {
    switch (pathname) {
      case "/admin":
        return "Overview of your application";

      case "/admin/users":
        return "Manage all users from one place";

      case "/admin/profile":
        return "Manage your profile information";

      default:
        return "Welcome back";
    }
  };

  return (
    <header
      className="
        sticky top-0 z-40
        flex h-20 items-center justify-between
        border-b border-slate-200 dark:border-slate-700
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-xl
        px-8
        transition-all duration-300
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <button
          className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-100
            dark:hover:bg-slate-800
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {getTitle()}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {getDescription()}
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-80
              rounded-xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              py-3 pl-11 pr-4
              text-sm
              outline-none
              transition-all duration-300
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              dark:text-white
              dark:focus:ring-blue-900/40
            "
          />
        </div>

        {/* Theme Toggle */}

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              group
              rounded-xl
              border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-800
              p-3
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              active:scale-95
            "
          >
            <div className="transition-transform duration-500 group-hover:rotate-180">
              {theme === "dark" ? (
                <Sun size={19} className="text-yellow-400" />
              ) : (
                <Moon
                  size={19}
                  className="text-slate-700 dark:text-slate-200"
                />
              )}
            </div>
          </button>
        )}

        {/* Notification */}

        <button
          className="
            relative
            rounded-xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            p-3
            transition-all duration-300
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <Bell size={19} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User */}

        <button
          className="
            flex items-center gap-3
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            px-4 py-2
            transition-all duration-300
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <UserCircle size={42} className="text-blue-600" />

          <div className="hidden text-left md:block">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Admin
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              admin@gmail.com
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
