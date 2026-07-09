"use client";

import { Users, ShieldCheck, User } from "lucide-react";

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
      color: "bg-blue-600",
      text: "All registered accounts",
    },
    {
      title: "Administrators",
      value: adminCount,
      icon: ShieldCheck,
      color: "bg-emerald-600",
      text: "System administrators",
    },
    {
      title: "Normal Users",
      value: userCount,
      icon: User,
      color: "bg-orange-500",
      text: "Registered users",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
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
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-slate-400">{card.text}</p>
              </div>

              <div
                className={`
                  ${card.color}
                  rounded-2xl
                  p-4
                  text-white
                  transition-transform duration-300
                  group-hover:scale-110
                `}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
