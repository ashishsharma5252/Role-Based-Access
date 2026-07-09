"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface Props {
  totalAdmins: number;
  totalUsers: number;
}

export default function UserBarChart({ totalAdmins, totalUsers }: Props) {
  const data = [
    {
      name: "Admins",
      count: totalAdmins,
    },
    {
      name: "Users",
      count: totalUsers,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" vertical={false} />

        <XAxis dataKey="name" tickLine={false} axisLine={false} />

        <YAxis tickLine={false} axisLine={false} />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="#2563eb"
          radius={[10, 10, 0, 0]}
          maxBarSize={70}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
