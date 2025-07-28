import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function CouncilBreakdownChart({ data }) {
  return (
    <div className="p-4 bg-white shadow-xl rounded-2xl mt-6">
      <h3 className="text-lg font-medium mb-2">Council Breakdown</h3>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}