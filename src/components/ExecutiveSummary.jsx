import { useState, useMemo } from "react";
import data from "../data.json";

// Thematic Area to Indicator map
const indicatorsByThematicArea = {
  "Coordination, Monitoring and Evaluation": [
    {
      label:
        "Percentage of NPA VAWC Coordinators capacitated to coordinate and report on implementation of VAWC interventions",
      value: "percentage_of_npa_vawc_coordinators_capacitated",
    },
    {
      label: "Budgetary allocation for VAWC",
      value: "budgetary_allocation_for_vawc",
    }
  ],
  "Household Economic Strengthening": [
    {
      label:
        "Percentage of women with a bank account (disaggregated by age and location)",
      value: "percentage_of_women_with_bank_access",
    },
    {
      label: "Number of women participating in women's economic empowerment platforms",
      value: "number_of_women_participating_in_womens_economic_empowerment_platforms",
    },
    {
      label: "Number of women accessing vocational training, disaggregated by age, disability, and location",
      value: "number_of_women_accessing_vocational_training",
    }
  ],
  "Safe Environment in Public Spaces": [
    {
      label: "Number of VAWC cases committed in public",
      value: "number_of_vawc_cases_committed_in_public",
    },
    {
      label: "Percentage of Registered Public Spaces with Gender Desks",
      value: "percentage_of_registered_public_spaces_with_gender_desks",
    }
  ],
  "Parenting, Family Support and Relationship": [
    {
      label:
        "Number of community with ECD centers",
      value: "number_of_community_members_reached",
    },
  ],
  "Implementation and Enforcement of Laws": [
    {
      label:
        "Number of law enforcement agents and other personel  trained to deliver equitable and integrated legal services",
      value: "number_of_law_enforcement_agents_trained",
    },
    {
      label: "Percentage of VAWC cases determined/concluded by courts within the timelines",
      value: "percentage_of_vawc_cases_determined_by_courts",
    }
  ],
  "Response and Supportive Services": [
    {
      label: "Number of women who have experienced violence and sought help",
      value: "number_of_women_who_sought_help",
    },
    {
      label: "Number of children experienced sexual violence and seek help",
      value: "number_of_children_who_sought_help",
    },
    {
      label: "Proportion of healthcare facilities offering specialized VAWC services",
      value: "proportion_of_healthcare_facilities_offering_specialized_vawc_services",
    }
  ],
  "Safe Education/Learning Environment and Life Skills": [
    {
      label:
        "Number of schools that established confidential and safe reporting mechanisms by type of mechanism",
      value: "number_of_schools_with_reporting_mechanisms_by_type",
    },
    {
      label: "Number of schools that established disability-friendly facilities",
      value: "number_of_schools_with_disability_friendly_facilities",
    },
    {
      label: "Number of educational institutions  with food programs for students in both primary and secondary schools",
      value: "number_of_schools_with_food_programs",
    }
  ],
};

export default function ExecutiveSummary({ thematicArea, target }) {
  const indicatorOptions = useMemo(() => indicatorsByThematicArea[thematicArea] || [], [thematicArea]);
  const [selectedQuarter, setSelectedQuarter] = useState("");

  const [selectedIndicator, setSelectedIndicator] = useState(
    indicatorOptions[0]?.value || ""
  );

  const nationalTotal = useMemo(() => {
    return data.reduce((sum, region) => {
      return (
        sum +
        region.councils.reduce((sub, council) => {
          const val = council[selectedIndicator];
          if (typeof val === "number") return sub + val;
          if (typeof val === "object") return sub + Object.values(val).reduce((a, b) => a + b, 0);
          return sub;
        }, 0)
      );
    }, 0);
  }, [selectedIndicator]);

  const percentage = ((nationalTotal / target) * 100).toFixed(1);
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
        {/* Indicator Dropdown */}
        <label className="flex-1 text-sm font-medium text-gray-700">
          Select Indicator:
          <select
            className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200 text-xs"
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
          >
            {indicatorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {/* Quartile Dropdown */}
        <label className="w-40 text-sm font-medium text-gray-700">
          Select Period:
          <select
            className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200 text-xs"
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
          <span> National Target:</span>
          <span className="font-medium text-gray-900">
            {target.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Actual Reached:</span>
          <span className="font-medium text-gray-900">
            {nationalTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span> Progress:</span>
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




// import { useState } from "react";
// import data from "../data.json";

// const thematicIndicators = {
//   "Coordination, Monitoring and Evaluation": [
//     {
//       label:
//         "Percentage of NPA VAWC Coordinators capacitated to coordinate and report",
//       value: "percentage_of_npa_vawc_coordinators_capacitated"
//     }
//   ],
//   "Household Economic Strengthening": [
//     {
//       label:
//         "Percentage of women with a bank account (by age and location)",
//       value: "percentage_of_women_with_bank_access"
//     }
//   ],
//   "Norms and Values": [
//     {
//       label:
//         "Number of community members reached (positive social norms)",
//       value: "number_of_community_members_reached"
//     }
//   ],
//   "Safe Environment in Public Spaces": [
//     {
//       label: "Number of VAWC cases committed in public",
//       value: "number_of_vawc_cases_committed_in_public"
//     }
//   ],
//   "Parenting, Family Supports and Relationships": [
//     {
//       label:
//         "Number of community members reached (parenting norms and roles)",
//       value: "number_of_community_members_reached"
//     }
//   ],
//   "Implementation and Enforcement of Laws": [
//     {
//       label:
//         "Number of law enforcement agents trained for legal services",
//       value: "number_of_law_enforcement_agents_trained"
//     }
//   ],
//   "Response and Supportive Services": [
//     {
//       label:
//         "Number of women who experienced violence and sought help",
//       value: "number_of_women_who_sought_help"
//     }
//   ],
//   "Safe Education/Learning Environments and Life Skills": [
//     {
//       label:
//         "Number of schools with safe reporting mechanisms",
//       value: "number_of_schools_with_reporting_mechanisms_by_type"
//     }
//   ]
// };

// export default function ExecutiveSummary({ target }) {
//   const [selectedTheme, setSelectedTheme] = useState(
//     Object.keys(thematicIndicators)[0]
//   );
//   const [selectedIndicator, setSelectedIndicator] = useState(
//     thematicIndicators[selectedTheme][0].value
//   );

//   const indicatorOptions = thematicIndicators[selectedTheme];
//   const indicatorLabel =
//     indicatorOptions.find((i) => i.value === selectedIndicator)?.label || "";

//   const nationalTotal = data.reduce((sum, region) => {
//     return (
//       sum +
//       region.councils.reduce((sub, council) => {
//         const val = council[selectedIndicator];
//         if (typeof val === "number") return sub + val;
//         return sub;
//       }, 0)
//     );
//   }, 0);

//   const percentage = ((nationalTotal / target) * 100).toFixed(1);
//   const percentNum = parseFloat(percentage);

//   const progressColor =
//     percentNum >= 100
//       ? "bg-green-600"
//       : percentNum >= 75
//       ? "bg-blue-600"
//       : percentNum >= 50
//       ? "bg-yellow-500"
//       : "bg-red-500";

//   return (
//     <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-6 transition hover:shadow-lg">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         Executive Summary — {indicatorLabel}
//       </h2>

//       <div className="mb-4">
//         <label className="block text-sm text-gray-700 font-medium mb-1">
//           Thematic Area
//         </label>
//         <select
//           className="w-full p-2 border rounded"
//           value={selectedTheme}
//           onChange={(e) => {
//             const theme = e.target.value;
//             setSelectedTheme(theme);
//             setSelectedIndicator(thematicIndicators[theme][0].value);
//           }}
//         >
//           {Object.keys(thematicIndicators).map((theme) => (
//             <option key={theme} value={theme}>
//               {theme}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm text-gray-700 font-medium mb-1">
//           Indicator
//         </label>
//         <select
//           className="w-full p-2 border rounded"
//           value={selectedIndicator}
//           onChange={(e) => setSelectedIndicator(e.target.value)}
//         >
//           {indicatorOptions.map((ind) => (
//             <option key={ind.value} value={ind.value}>
//               {ind.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="space-y-2 text-sm text-gray-600">
//         <div className="flex justify-between">
//           <span> National Target:</span>
//           <span className="font-medium text-gray-900">
//             {target.toLocaleString()}
//           </span>
//         </div>
//         <div className="flex justify-between">
//           <span>Actual Reached:</span>
//           <span className="font-medium text-gray-900">
//             {nationalTotal.toLocaleString()}
//           </span>
//         </div>
//         <div className="flex justify-between">
//           <span> Progress:</span>
//           <span className="font-semibold text-blue-700">{percentage}%</span>
//         </div>
//       </div>

//       <div className="mt-4">
//         <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//           <div
//             className={`h-full ${progressColor} transition-all duration-500`}
//             style={{ width: `${Math.min(percentNum, 100)}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }
