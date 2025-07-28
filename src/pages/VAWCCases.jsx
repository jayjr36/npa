import { useState } from "react";
import data from "../data.json";
import {
  aggregateCouncilsByRegion,
  getCouncilsContribution,
} from "../utils/aggregations";
import StackedRegionChart from "../components/StackedRegionChart";
import CouncilPieChart from "../components/CouncilPieChart";
import ExecutiveSummary from "../components/ExecutiveSummary";


export default function VAWCCases() {
  // const regionTotals = aggregateIndicatorByRegion(data, 'number_of_vawc_cases_committed_in_public');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regionCouncilData = aggregateCouncilsByRegion(
    data,
    "number_of_vawc_cases_committed_in_public"
  );

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
  };

  const selectedRegionData = data.find(
    (region) => region.region === selectedRegion
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Public VAWC Cases</h1>
      <ExecutiveSummary
        indicator="number_of_vawc_cases_committed_in_public"
        target={600000}
        title="VAWC Cases Committed in Public"
      />
      <StackedRegionChart
        data={regionCouncilData}
        indicator="number_of_vawc_cases_committed_in_public"
        onBarClick={handleRegionClick}
      />
      {selectedRegion && selectedRegionData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Council Contributions in {selectedRegion}
          </h2>
          <CouncilPieChart
            data={getCouncilsContribution(
              selectedRegionData,
              "number_of_vawc_cases_committed_in_public"
            )}
          />
        </div>
      )}
    </div>
  );
}
