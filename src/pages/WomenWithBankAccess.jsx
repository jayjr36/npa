import { useState } from "react";
import data from "../data.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ExecutiveSummaryBankAccess from "../components/ExecutiveSummaryBankAccess";

export default function WomenWithBankAccess() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const ageGroups = ["15-24", "25-34", "35-44", "45+"];
  const colors = ["#A8DADC", "#E5989B", "#B5EAD7", "#FFDAC1"];

  // Regional stacked bar chart data
  const regionAverages = data.map(region => {
    const result = { region: region.region };
    ageGroups.forEach(age => {
      const total = region.councils.reduce(
        (sum, c) => sum + (c.percentage_of_women_with_bank_access?.[age] || 0),
        0
      );
      result[age] = +(total / region.councils.length).toFixed(1);
    });
    return result;
  });

  // Council pie chart data
  const selectedCouncils = selectedRegion
    ? data.find(r => r.region === selectedRegion)?.councils || []
    : [];

  const getPieData = (council) =>
    ageGroups.map((age, i) => ({
      name: age,
      value: council.percentage_of_women_with_bank_access?.[age] || 0,
      fill: colors[i],
    }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Household Economic Strengthening</h1>
      <ExecutiveSummaryBankAccess target={500000} title="Women With Bank Access" />

      {/* Regional Bar Chart */}
      <div className="bg-white rounded shadow p-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={regionAverages}
            onClick={(e) => {
              if (e?.activeLabel) setSelectedRegion(e.activeLabel);
            }}
          >
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            {ageGroups.map((age, i) => (
              <Bar key={age} dataKey={age} fill={colors[i]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Council Pie Charts */}
      {selectedRegion && (
        <div className="mt-8 bg-white border border-gray-200 rounded shadow p-6">
          <h3 className="text-lg font-bold mb-6">
            Council-Level Breakdown – {selectedRegion}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {selectedCouncils.map((council, idx) => (
              <div key={idx} className="text-center">
                <h4 className="font-semibold mb-2">{council.name}</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={getPieData(council)}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={60}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {getPieData(council).map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "white", color: "#000" }}
                      itemStyle={{ color: "#000" }}
                      labelStyle={{ color: "#000" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
