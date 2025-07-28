import { useState } from "react";
import data from "../data.json";
import {
  aggregateCouncilsByRegion,
  getCouncilsContribution,
} from "../utils/aggregations";
import StackedRegionChart from "../components/StackedRegionChart";
import CouncilPieChart from "../components/CouncilPieChart";
import ExecutiveSummary from "../components/ExecutiveSummary";


export default function WomenWhoSoughtHelp() {
  // const regionTotals = aggregateIndicatorByRegion(data, 'number_of_women_who_sought_help');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regionCouncilData = aggregateCouncilsByRegion(
    data,
    "number_of_women_who_sought_help"
  );

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
  };

  const selectedRegionData = data.find(
    (region) => region.region === selectedRegion
  );


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Response and Supportive Services</h1>

      <ExecutiveSummary
        indicator="number_of_women_who_sought_help"
        target={1000000}
        thematicArea="Response and Supportive Services"
      />

      <StackedRegionChart
        data={regionCouncilData}
        indicator="Women Who Sought Help"
         onBarClick={handleRegionClick}
        />
      {selectedRegion && selectedRegionData && (
        <div className="mt-8 bg-white p-3">
          <h2 className="text-xl font-semibold mb-2">
            Council Contributions in {selectedRegion}
          </h2>
          <CouncilPieChart
            data={getCouncilsContribution(
              selectedRegionData,
              "number_of_women_who_sought_help"
            )}
          />
        </div>
      )}
    </div>
  );
}
