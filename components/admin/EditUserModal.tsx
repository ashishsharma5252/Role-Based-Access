"use client";

import { useEffect, useState } from "react";
import { X, UserCog } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
  onUserUpdated,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      onUserUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <UserCog size={24} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Edit User
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Update user information
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Role
            </label>

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-slate-300
                px-5
                py-3
                font-medium
                transition
                hover:bg-slate-100
                dark:border-slate-700
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}