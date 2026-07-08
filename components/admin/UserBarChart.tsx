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

export default function UserBarChart({
  totalAdmins,
  totalUsers,
}: Props) {
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
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="count"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}