"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  adminCount: number;
  userCount: number;
}

export default function RolePieChart({
  adminCount,
  userCount,
}: Props) {
  const data = [
    {
      name: "Admins",
      value: adminCount,
    },
    {
      name: "Users",
      value: userCount,
    },
  ];

  const COLORS = ["#2563eb", "#22c55e"];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}