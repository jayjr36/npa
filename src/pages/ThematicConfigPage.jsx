import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    name: "Household Economic Strengthening",
    indicators: [
      {
        id: 101,
        name: "Number of women participating in women's economic empowerment platforms",
        target: 5000,
        showActivities: true,
        activities: [
          "Training women and engagement in agricultural activities",
          "Facilitate the establishment of women's savings groups",
          "Follow-ups"
        ]
      }
      // ,
      // {
      //   id: 102,
      //   name: "Number of women accessing vocational training",
      //   target: 3000,
      //   showActivities: true,
      //   activities: [
      //     "Facilitate enrollment of women in VETA",
      //     "Promote skill-building workshops"
      //   ]
      // }
    ]
  }
];

export default function ThematicConfigPage() {
  const [areas, setAreas] = useState(initialData);

  const handleAreaChange = (index, newName) => {
    const updated = [...areas];
    updated[index].name = newName;
    setAreas(updated);
  };

  const handleAddArea = () => {
    setAreas([...areas, { id: Date.now(), name: "New Thematic Area", indicators: [] }]);
  };

  const handleAddIndicator = (areaIndex) => {
    const updated = [...areas];
    updated[areaIndex].indicators.push({
      id: Date.now(),
      name: "New Indicator",
      target: 0,
      showActivities: true,
      activities: []
    });
    setAreas(updated);
  };

  const handleIndicatorChange = (areaIndex, indIndex, field, value) => {
    const updated = [...areas];
    updated[areaIndex].indicators[indIndex][field] = value;
    setAreas(updated);
  };

  const handleAddActivity = (areaIndex, indIndex) => {
    const updated = [...areas];
    updated[areaIndex].indicators[indIndex].activities.push("New Activity");
    setAreas(updated);
  };

  const handleActivityChange = (areaIndex, indIndex, actIndex, value) => {
    const updated = [...areas];
    updated[areaIndex].indicators[indIndex].activities[actIndex] = value;
    setAreas(updated);
  };

  const toggleActivities = (areaIndex, indIndex) => {
    const updated = [...areas];
    updated[areaIndex].indicators[indIndex].showActivities = !updated[areaIndex].indicators[indIndex].showActivities;
    setAreas(updated);
  };

  const handleSave = () => {
    console.log("Configuration Saved:", JSON.stringify(areas, null, 2));
    alert("Configuration saved to console.");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Thematic Areas
        </h1>

        {areas.map((area, aIdx) => (
          <div key={area.id} className="bg-white border rounded-lg shadow mb-6 p-6">
            <input
              className="text-xl font-semibold w-full border-b mb-4 border-gray-300 focus:outline-none focus:border-blue-500"
              value={area.name}
              onChange={(e) => handleAreaChange(aIdx, e.target.value)}
            />

            {area.indicators.map((indicator, iIdx) => (
              <div key={indicator.id} className="border-t pt-4 mt-4">
                <input
                  type="text"
                  className="w-full font-medium text-md border-b border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
                  value={indicator.name}
                  onChange={(e) =>
                    handleIndicatorChange(aIdx, iIdx, "name", e.target.value)
                  }
                />

                <div className="flex items-center gap-4 mb-3">
                  <label className="text-sm text-gray-600">5-Year Target:</label>
                  <input
                    type="number"
                    className="border px-2 py-1 w-32 rounded text-sm"
                    value={indicator.target}
                    onChange={(e) =>
                      handleIndicatorChange(aIdx, iIdx, "target", Number(e.target.value))
                    }
                  />

                  <button
                    onClick={() => toggleActivities(aIdx, iIdx)}
                    className="text-blue-600 text-sm hover:underline ml-auto"
                  >
                    {indicator.showActivities ? "Hide Activities" : "Show Activities"}
                  </button>
                </div>

                {indicator.showActivities && (
                  <div className="pl-4 space-y-2">
                    {indicator.activities.map((activity, actIdx) => (
                      <input
                        key={actIdx}
                        type="text"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={activity}
                        onChange={(e) =>
                          handleActivityChange(aIdx, iIdx, actIdx, e.target.value)
                        }
                      />
                    ))}
                    <button
                      onClick={() => handleAddActivity(aIdx, iIdx)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      + Add Activity
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => handleAddIndicator(aIdx)}
              className="text-blue-700 mt-4 text-sm hover:underline"
            >
              + Add Indicator
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleAddArea}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Thematic Area
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
