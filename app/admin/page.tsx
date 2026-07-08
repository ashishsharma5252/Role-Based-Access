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
        <h2 className="text-xl font-semibold text-gray-600">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Cards */}
      <DashboardStats
        totalUsers={dashboard.totalUsers}
        adminCount={dashboard.totalAdmins}
        userCount={dashboard.totalNormalUsers}
      />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Users by Role
          </h2>

          <RolePieChart
            adminCount={dashboard.totalAdmins}
            userCount={dashboard.totalNormalUsers}
          />
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-bold text-slate-800">
            User Distribution
          </h2>

          <UserBarChart
            totalAdmins={dashboard.totalAdmins}
            totalUsers={dashboard.totalNormalUsers}
          />
        </div>
      </div>

      {/* Recent Users */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Recent Users
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>

                <th className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentUsers.length > 0 ? (
                dashboard.recentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="border-b px-6 py-4">{user.name}</td>

                    <td className="border-b px-6 py-4">{user.email}</td>

                    <td className="border-b px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
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
                    className="py-8 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}