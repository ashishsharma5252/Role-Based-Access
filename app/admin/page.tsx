"use client";

import { useEffect, useState } from "react";

import DashboardStats from "@/components/admin/DashboardStats";
import RolePieChart from "@/components/admin/RolePieChart";
import UserBarChart from "@/components/admin/UserBarChart";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface DashboardData {
  totalUsers: number;
  totalAdmins: number;
  totalNormalUsers: number;
  recentUsers: User[];
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState<DashboardData>({
    totalUsers: 0,
    totalAdmins: 0,
    totalNormalUsers: 0,
    recentUsers: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();

      if (data.success) {
        setDashboard({
          totalUsers: data.totalUsers,
          totalAdmins: data.totalAdmins,
          totalNormalUsers: data.totalNormalUsers,
          recentUsers: data.recentUsers,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics */}

      <DashboardStats
        totalUsers={dashboard.totalUsers}
        adminCount={dashboard.totalAdmins}
        userCount={dashboard.totalNormalUsers}
      />

      {/* Charts */}

      <section className="grid gap-6 xl:grid-cols-2">
        <div
          className="
            rounded-3xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            p-6
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Users by Role
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Distribution of users in the system
            </p>
          </div>

          <RolePieChart
            adminCount={dashboard.totalAdmins}
            userCount={dashboard.totalNormalUsers}
          />
        </div>

        <div
          className="
            rounded-3xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            p-6
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              User Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Comparison between admins and users
            </p>
          </div>

          <UserBarChart
            totalAdmins={dashboard.totalAdmins}
            totalUsers={dashboard.totalNormalUsers}
          />
        </div>
      </section>

      {/* Recent Users */}

      <section
        className="
          overflow-hidden
          rounded-3xl
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-900
          shadow-sm
          transition-all duration-300
          hover:shadow-xl
        "
      >
        <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Users
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Recently registered users
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentUsers.length > 0 ? (
                dashboard.recentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="
                      border-t border-slate-200 dark:border-slate-700
                      transition-all duration-200
                      hover:bg-slate-50 dark:hover:bg-slate-800
                    "
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            flex h-11 w-11 items-center justify-center
                            rounded-full
                            bg-blue-600
                            font-semibold
                            text-white
                          "
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <span className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-14 text-center text-slate-500 dark:text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
