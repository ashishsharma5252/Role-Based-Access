"use client";

import { X, UserPlus } from "lucide-react";
import CreateUserForm from "./CreateUserForm";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

export default function CreateUserModal({
  isOpen,
  onClose,
  onUserCreated,
}: CreateUserModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/60
        backdrop-blur-md
        animate-in fade-in duration-300
        p-4
      "
    >
      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[30px]
          border border-slate-200/70 dark:border-slate-700
          bg-white/95 dark:bg-slate-900/95
          shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
          animate-in zoom-in-95 slide-in-from-bottom-5
          duration-300
        "
      >
        {/* Decorative Blur */}
        <div className="absolute -left-24 -top-24 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Header */}
        <div
          className="
            relative
            flex items-center justify-between
            border-b border-slate-200 dark:border-slate-700
            bg-linear-to-r
            from-blue-600
            via-blue-700
            to-indigo-700
            px-8
            py-6
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl
                bg-white/20
                backdrop-blur
                shadow-lg
              "
            >
              <UserPlus size={28} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Create New User</h2>

              <p className="mt-1 text-sm text-blue-100">
                Add a new member to your application.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              group
              rounded-2xl
              bg-white/10
              p-3
              text-white
              backdrop-blur
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-white/20
              hover:scale-110
            "
          >
            <X size={20} className="transition-transform duration-300" />
          </button>
        </div>

        {/* Body */}
        <div className="relative p-8">
          <CreateUserForm
            onUserCreated={() => {
              onUserCreated();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
