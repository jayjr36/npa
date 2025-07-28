import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#007236", "#FCD116", "#002395", "#000000", "#DD1C1A"];

export default function CouncilPieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map((item) => ({
    ...item,
    percent: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataWithPercent}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${percent}%`}
          outerRadius={100}
        >
          {dataWithPercent.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
