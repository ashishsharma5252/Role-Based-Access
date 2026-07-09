import ProfileForm from "@/components/admin/ProfileForm";
import { UserCircle2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section
        className="
          relative overflow-hidden
          rounded-3xl
          border border-slate-200 dark:border-slate-700
          bg-white/90 dark:bg-slate-900/90
          backdrop-blur-xl
          p-8
          shadow-sm
          transition-all
          duration-300
          hover:shadow-xl
        "
      >
        {/* Background Decorations */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div
              className="
                flex h-16 w-16 items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-white
                shadow-xl
              "
            >
              <UserCircle2 size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                My Profile
              </h1>

              <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
                View and manage your account information, update your profile,
                and securely change your password from one place.
              </p>
            </div>
          </div>

          {/* Right Badge */}
          <div
            className="
              rounded-2xl
              border border-blue-200
              bg-blue-50
              px-5 py-3
              text-center
              shadow-sm
              dark:border-blue-900
              dark:bg-blue-950/30
            "
          >
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Account
            </p>

            <h3 className="mt-1 text-lg font-bold text-blue-600">
              Profile Settings
            </h3>
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <ProfileForm />
    </div>
  );
}
