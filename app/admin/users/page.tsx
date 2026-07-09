"use client";

import { useState } from "react";
import { UserPlus, Users } from "lucide-react";

import UserTable from "@/components/admin/UserTable";
import CreateUserModal from "@/components/admin/CreateUserModal";

export default function UsersPage() {
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserCreated = () => {
    setRefresh((prev) => !prev);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <section
        className="
          relative overflow-hidden
          rounded-3xl
          border border-slate-200/70 dark:border-slate-700
          bg-gradient-to-br
          from-white
          via-slate-50
          to-blue-50
          dark:from-slate-900
          dark:via-slate-900
          dark:to-slate-800
          p-8
          shadow-sm
          backdrop-blur-xl
        "
      >
        {/* Decorative Blobs */}

        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}

          <div className="flex items-center gap-5">
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-white
                shadow-xl
                transition-all
                duration-500
                hover:rotate-6
                hover:scale-105
              "
            >
              <Users size={36} />
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                User Management
              </h1>

              <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
                Create, update and manage all registered users from one place.
                Built for speed, security and simplicity.
              </p>
            </div>
          </div>

          {/* Right */}

          <button
            onClick={() => setIsModalOpen(true)}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              px-7
              py-4
              font-semibold
              text-white
              shadow-xl
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-2xl
              active:scale-95
            "
          >
            {/* Shine */}

            <span
              className="
                absolute inset-0
                translate-x-[-120%]
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-[120%]
              "
            />

            <div className="relative flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/20
                  transition-all
                  duration-500
                  group-hover:scale-110
                "
              >
                <UserPlus size={20} />
              </div>

              <span>Create New User</span>
            </div>
          </button>
        </div>
      </section>

      {/* ================= TABLE ================= */}

      <section
        className="
          overflow-hidden
          rounded-3xl
          border border-slate-200/70 dark:border-slate-700
          bg-white/90
          dark:bg-slate-900/90
          backdrop-blur-xl
          shadow-sm
          transition-all
          duration-500
          hover:shadow-xl
        "
      >
        <UserTable refresh={refresh} />
      </section>

      {/* ================= MODAL ================= */}

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
}
