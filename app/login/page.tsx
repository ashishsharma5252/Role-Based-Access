"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-slate-100
        via-blue-50
        to-indigo-100
        px-4
        transition-colors
        duration-500
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
      "
    >
      {/* Background Blur Circles */}

      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* Login Card */}

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/20
          bg-white/70
          p-8
          shadow-2xl
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          dark:border-slate-700
          dark:bg-slate-900/70
        "
      >
        {/* Logo */}

        <div className="mb-8 flex justify-center">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-blue-600
              text-white
              shadow-xl
            "
          >
            <ShieldCheck size={38} />
          </div>
        </div>

        {/* Heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white/70
                  py-3
                  pl-12
                  pr-4
                  text-slate-900
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
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
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white/70
                  py-3
                  pl-12
                  pr-4
                  text-slate-900
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:ring-blue-900/40
                "
              />
            </div>
          </div>

          {/* Error */}

          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-center
                text-sm
                text-red-600
                dark:border-red-900
                dark:bg-red-950/30
                dark:text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
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
              disabled:opacity-70
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="mr-2 animate-spin"
                />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Role Based Authentication System
          </p>
        </div>
      </div>
    </main>
  );
}