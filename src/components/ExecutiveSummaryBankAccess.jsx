import data from "../data.json";
import { useState } from "react";

export default function ExecutiveSummaryBankAccess({ target, title }) {
    const ageGroups = ["15-24", "25-34", "35-44", "45+"];
    const [selectedQuarter, setSelectedQuarter] = useState("");

    // Calculate average across all councils and age groups
    let total = 0;
    let count = 0;

    data.forEach(region => {
        region.councils.forEach(council => {
            ageGroups.forEach(age => {
                const value = council.percentage_of_women_with_bank_access?.[age];
                if (typeof value === "number") {
                    total += value;
                    count += 1;
                }
            });
        });
    });

    const nationalAvg = ((total / count)*100);
    const percentage = ((nationalAvg / target) * 100).toFixed(1);
    const percentNum = parseFloat(percentage);

    const progressColor =
        percentNum >= 100
            ? "bg-blue-600"
            : percentNum >= 75
                ? "bg-blue-600"
                : percentNum >= 50
                    ? "bg-blue-600"
                    : "bg-blue-600";

    return (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-6 transition hover:shadow-lg">
            <div className="flex items-end justify-between gap-4 mb-5">
                <label className="flex-1 text-sm font-medium text-gray-700">
                    Select Indicator:
                    <select
                        className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled hidden>
                            Select an indicator
                        </option>
                        <option value="percentage_of_women_with_bank_access">Percentage of Women With Bank Access </option>
                    </select>
                </label>
                {/* Quartile Dropdown */}
                <label className="w-40 text-sm font-medium text-gray-700">
                    Select Period:
                    <select
                        className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200"
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value)}
                    >
                        <option value="">Select Quartile</option>
                        <option value="Q1">Q1 (Jan–Mar)</option>
                        <option value="Q2">Q2 (Apr–Jun)</option>
                        <option value="Q3">Q3 (Jul–Sep)</option>
                        <option value="Q4">Q4 (Oct–Dec)</option>
                    </select>
                </label>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>National Target:</span>
                    <span className="font-medium text-gray-900">{target}</span>
                </div>
                <div className="flex justify-between">
                    <span>Target Reached:</span>
                    <span className="font-medium text-gray-900">{percentage}</span>
                </div>
                <div className="flex justify-between">
                    <span>Progress Toward Target:</span>
                    <span className="font-semibold text-blue-700">{percentage}%</span>
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className={`h-full ${progressColor} transition-all duration-500`}
                        style={{ width: `${Math.min(percentNum, 100)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
