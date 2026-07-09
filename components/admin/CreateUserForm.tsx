"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface CreateUserFormProps {
  onUserCreated: () => void;
}

export default function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage("User created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      onUserCreated();
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
    relative
    space-y-7
    rounded-3xl
    border border-slate-200/60 dark:border-slate-700
    bg-linear-to-br
    from-slate-50/80
    via-white
    to-blue-50/70
    dark:from-slate-900
    dark:via-slate-900
    dark:to-slate-800
    p-8
    backdrop-blur-xl
  "
    >
      {/* Name */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Full Name
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
              w-full
              rounded-2xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              py-3 pl-12 pr-4
              text-slate-900 dark:text-white
              outline-none
              transition-all duration-300
              placeholder:text-slate-400
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
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              rounded-2xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              py-3 pl-12 pr-4
              text-slate-900 dark:text-white
              outline-none
              transition-all duration-300
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              dark:focus:ring-blue-900/40
            "
          />
        </div>
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full
              rounded-2xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              py-3 pl-12 pr-4
              text-slate-900 dark:text-white
              outline-none
              transition-all duration-300
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              dark:focus:ring-blue-900/40
            "
          />
        </div>
      </div>

      {/* Role */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          User Role
        </label>

        <div className="relative">
          <Shield
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              w-full
              appearance-none
              rounded-2xl
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              py-3 pl-12 pr-4
              text-slate-900 dark:text-white
              outline-none
              transition-all duration-300
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              dark:focus:ring-blue-900/40
            "
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Success Message */}

      {message && (
        <div
          className="
            flex items-center gap-3
            rounded-2xl
            border border-emerald-200 dark:border-emerald-800
            bg-emerald-50 dark:bg-emerald-950/30
            px-4 py-3
            text-sm
            text-emerald-700 dark:text-emerald-300
          "
        >
          <CheckCircle size={18} />
          {message}
        </div>
      )}

      {/* Error Message */}

      {error && (
        <div
          className="
            flex items-center gap-3
            rounded-2xl
            border border-red-200 dark:border-red-800
            bg-red-50 dark:bg-red-950/30
            px-4 py-3
            text-sm
            text-red-700 dark:text-red-300
          "
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Submit Button */}

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            py-3.5
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-blue-700
            hover:shadow-xl
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading && <Loader2 size={18} className="animate-spin" />}

          {loading ? "Creating User..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
