"use client";

import {
  Users,
  ShieldCheck,
  User,
  BarChart3,
} from "lucide-react";

interface DashboardStatsProps {
  totalUsers: number;
  adminCount: number;
  userCount: number;
}

export default function DashboardStats({
  totalUsers,
  adminCount,
  userCount,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Admins",
      value: adminCount,
      icon: ShieldCheck,
      color: "bg-green-500",
    },
    {
      title: "Users",
      value: userCount,
      icon: User,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div className={`${card.color} rounded-xl p-4 text-white`}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}