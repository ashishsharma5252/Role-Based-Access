"use client";

import { useEffect, useState } from "react";
import {
  UserCircle,
  User,
  Mail,
  Shield,
  Lock,
  Save,
  KeyRound,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function ProfileForm() {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    role: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message || "Unable to load profile.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setSavingProfile(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    setSavingPassword(true);
    setSuccess("");
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setSavingPassword(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Password updated successfully.");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-900
          p-16
          shadow-sm
        "
      >
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={46} className="animate-spin text-blue-600" />

          <p className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-300">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {(success || error) && (
        <div
          className={`flex items-center gap-3 rounded-2xl border px-5 py-4 ${
            success
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          }`}
        >
          {success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}

          <span>{success || error}</span>
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-3">
        {/* LEFT PROFILE CARD */}

        <div
          className="
            rounded-3xl
            border border-slate-200 dark:border-slate-700
            bg-white/90 dark:bg-slate-900/90
            backdrop-blur-xl
            p-8
            shadow-sm
          "
        >
          <div className="flex flex-col items-center">
            <div
              className="
                flex h-32 w-32 items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-white
                shadow-xl
              "
            >
              <UserCircle size={90} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
              {user.name}
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {user.email}
            </p>

            <span
              className="
                mt-5
                rounded-full
                bg-blue-100
                px-5
                py-2
                text-sm
                font-semibold
                capitalize
                text-blue-700
                dark:bg-blue-900/40
                dark:text-blue-300
              "
            >
              {user.role}
            </span>

            <div className="mt-10 w-full space-y-5">
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Name
                </p>

                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {user.name}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Email
                </p>

                <p className="mt-1 font-semibold text-slate-900 dark:text-white break-all">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Role
                </p>

                <p className="mt-1 font-semibold capitalize text-slate-900 dark:text-white">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SECTION */}

        <div className="space-y-8 xl:col-span-2">
          {/* ACCOUNT INFORMATION */}

          <div
            className="
              rounded-3xl
              border border-slate-200 dark:border-slate-700
              bg-white/90 dark:bg-slate-900/90
              backdrop-blur-xl
              p-8
              shadow-sm
            "
          >
            <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
              Account Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={user.name}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        name: e.target.value,
                      })
                    }
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-300 dark:border-slate-700
                      bg-slate-50 dark:bg-slate-800
                      py-3 pl-12 pr-4
                      text-slate-900 dark:text-white
                      outline-none
                      transition-all duration-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      dark:focus:ring-blue-900/40
                    "
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={user.email}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        email: e.target.value,
                      })
                    }
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-300 dark:border-slate-700
                      bg-slate-50 dark:bg-slate-800
                      py-3 pl-12 pr-4
                      text-slate-900 dark:text-white
                      outline-none
                      transition-all duration-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      dark:focus:ring-blue-900/40
                    "
                  />
                </div>
              </div>
            </div>

            {/* Role */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">
                User Role
              </label>

              <div className="relative">
                <Shield
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={user.role}
                  readOnly
                  className="
                    w-full
                    rounded-2xl
                    border border-slate-300 dark:border-slate-700
                    bg-slate-100 dark:bg-slate-800
                    py-3 pl-12 pr-4
                    capitalize
                    text-slate-600 dark:text-slate-300
                  "
                />
              </div>
            </div>

            <button
              onClick={updateProfile}
              disabled={savingProfile}
              className="
                mt-8
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                py-3.5
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {savingProfile ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}

              {savingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* PASSWORD CARD */}

          <div
            className="
              rounded-3xl
              border border-slate-200 dark:border-slate-700
              bg-white/90 dark:bg-slate-900/90
              backdrop-blur-xl
              p-8
              shadow-sm
            "
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600 p-3 text-white">
                <KeyRound size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Change Password
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Keep your account secure by updating your password.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  value: passwords.currentPassword,
                  placeholder: "Current Password",
                  key: "currentPassword",
                },
                {
                  value: passwords.newPassword,
                  placeholder: "New Password",
                  key: "newPassword",
                },
                {
                  value: passwords.confirmPassword,
                  placeholder: "Confirm Password",
                  key: "confirmPassword",
                },
              ].map((field) => (
                <div key={field.key} className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        [field.key]: e.target.value,
                      })
                    }
                    className="
                      w-full
                      rounded-2xl
                      border border-slate-300 dark:border-slate-700
                      bg-slate-50 dark:bg-slate-800
                      py-3 pl-12 pr-4
                      text-slate-900 dark:text-white
                      outline-none
                      transition-all duration-300
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      dark:focus:ring-blue-900/40
                    "
                  />
                </div>
              ))}

              <button
                onClick={changePassword}
                disabled={savingPassword}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-emerald-600
                  to-green-600
                  py-3.5
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {savingPassword ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Lock size={18} />
                )}

                {savingPassword ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
