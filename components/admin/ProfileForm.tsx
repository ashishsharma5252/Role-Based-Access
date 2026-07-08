"use client";

import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function ProfileForm() {
  const [user, setUser] = useState<User>({
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">Loading Profile...</div>
    );
  }

  const updateProfile = async () => {
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
        alert(data.message);
        return;
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
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
        alert(data.message);
        return;
      }

      alert("Password updated successfully!");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <UserCircle size={90} className="text-blue-600" />

        <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>

        <p className="text-gray-500">{user.email}</p>

        <span className="mt-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700 capitalize">
          {user.role}
        </span>
      </div>

      {/* Profile Form */}
      <div className="mt-10 space-y-6">
        <div>
          <label className="mb-2 block font-medium">Name</label>

          <input
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Email</label>

          <input
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Role</label>

          <input
            value={user.role}
            readOnly
            className="w-full rounded-lg border bg-gray-100 px-4 py-3 capitalize"
          />
        </div>

        <button
          onClick={updateProfile}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* change password section */}
      <div className="mt-10 rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Change Password
        </h2>

        <div className="space-y-5">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                currentPassword: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                newPassword: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                confirmPassword: e.target.value,
              })
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <button
            onClick={changePassword}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
