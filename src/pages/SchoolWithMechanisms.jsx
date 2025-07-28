import data from "../data.json";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function SchoolsWithMechanisms() {
  const types = ["suggestion_box", "peer_support_groups", "school_counselor"];

  const aggregated = data.map(region => {
    const totals = { region: region.region };
    types.forEach(type => {
      totals[type] = region.councils.reduce((sum, c) => sum + (c.number_of_schools_with_reporting_mechanisms_by_type[type] || 0), 0);
    });
    return totals;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Schools with Reporting Mechanisms</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={aggregated}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="suggestion_box" fill="#8884d8" />
          <Bar dataKey="peer_support_groups" fill="#82ca9d" />
          <Bar dataKey="school_counselor" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
