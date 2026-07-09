"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import EditUserModal from "./EditUserModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  refresh: boolean;
}

export default function UserTable({
  refresh,
}: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/users");

      const data = await response.json();

      setUsers(data.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-3xl bg-white p-6 dark:bg-slate-900">

        {/* Header */}

        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <Users size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Users
              </h2>

              <p className="text-sm text-slate-500">
                {filteredUsers.length} registered users
              </p>
            </div>
          </div>

          {/* Search */}

          <div className="relative w-full max-w-sm">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                py-2.5
                pl-10
                pr-4
                outline-none
                transition
                focus:border-blue-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>
        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">

          <table className="min-w-full">

            <thead className="bg-slate-100 dark:bg-slate-800">

              <tr>

                <th className="px-6 py-4 text-left">
                  User
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Role
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="py-12 text-center text-slate-500"
                  >
                    No users found.
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >

                    {/* User */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

                          {user.name.charAt(0).toUpperCase()}

                        </div>

                        <span className="font-medium dark:text-white">
                          {user.name}
                        </span>

                      </div>

                    </td>

                    {/* Email */}

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {user.email}
                    </td>

                    {/* Role */}

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => handleEdit(user)}
                          className="rounded-xl bg-amber-500 p-2 text-white transition hover:bg-amber-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user._id)
                          }
                          className="rounded-xl bg-red-600 p-2 text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <EditUserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserUpdated={fetchUsers}
      />
    </>
  );
}