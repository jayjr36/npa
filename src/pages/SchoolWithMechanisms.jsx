import { useState } from "react";
import data from "../data.json";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Colors for pie charts
const pieColors = ["#8884d8", "#82ca9d", "#ffc658"];

// Executive summary component
function ExecutiveSummary({ totals, title, target }) {
  const total = totals.reduce((sum, val) => sum + val, 0);
  const percentage = ((total / target) * 100).toFixed(1);
  const percentNum = parseFloat(percentage);

  const progressColor =
    percentNum >= 100
      ? "bg-green-600"
      : percentNum >= 75
      ? "bg-blue-600"
      : percentNum >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-6">
            <label className="block mb-3 text-sm font-medium text-gray-700">
        Select Indicator:
        <select
          className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200"
        >
          <option value="" disabled hidden>
            Select an indicator
          </option>
          <option value="number_of_schools_with_mechanisms">Number of Schools with Reporting Mechanisms</option>
        </select>
      </label>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>National Target:</span>
          <span className="font-medium text-gray-900">{target.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Actual Total:</span>
          <span className="font-medium text-gray-900">{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Progress:</span>
          <span className="font-semibold text-blue-700">{percentage}%</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full ${progressColor}`}
            style={{ width: `${Math.min(percentNum, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function SchoolsWithMechanisms() {
  const types = ["suggestion_box", "peer_support_groups", "school_counselor"];
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Aggregate region-level totals
  const aggregated = data.map((region) => {
    const totals = { region: region.region };
    types.forEach((type) => {
      totals[type] = region.councils.reduce(
        (sum, c) =>
          sum + (c.number_of_schools_with_reporting_mechanisms_by_type[type] || 0),
        0
      );
    });
    return totals;
  });

  // Collect all values for executive summary
  const allTotals = aggregated.map((r) =>
    types.reduce((sum, type) => sum + r[type], 0)
  );
  const nationalTarget = 1000; // Customize this based on your actual goals

  const regionCouncilData =
    data.find((r) => r.region === selectedRegion)?.councils || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Safe Education/Learning Enviroment and Life Skills</h1>

      <ExecutiveSummary
        thematicArea="Schools with Reporting Mechanisms"
        totals={allTotals}
        target={nationalTarget}
      />

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={aggregated}
          onClick={(e) => {
            if (e && e.activeLabel) setSelectedRegion(e.activeLabel);
          }}
        >
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="suggestion_box" fill="#8884d8" />
          <Bar dataKey="peer_support_groups" fill="#82ca9d" />
          <Bar dataKey="school_counselor" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>

      {selectedRegion && (
        <div className="mt-8 bg-white p-4 rounded shadow border">
          <h2 className="text-xl font-bold mb-4">
            Council Breakdown – {selectedRegion}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {regionCouncilData.map((council, index) => {
              const pieData = types.map((type, i) => ({
                name: type.replace(/_/g, " "),
                value: council.number_of_schools_with_reporting_mechanisms_by_type?.[type] || 0,
              }));

              return (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded p-4"
                >
                  <h3 className="text-sm font-semibold text-center mb-2">{council.name}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label
                      >
                        {pieData.map((_, idx) => (
                          <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
