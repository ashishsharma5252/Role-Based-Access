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

  const COLORS = ["#2563eb", "#10b981"];

  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={4}
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent! * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}