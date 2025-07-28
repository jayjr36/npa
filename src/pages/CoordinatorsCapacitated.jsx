import data from "../data.json";
import { useState } from "react";
import { aggregateIndicatorByRegion, getCouncilsContribution, aggregateCouncilsByRegion } from "../utils/aggregations";
import RegionChart from "../components/RegionChart";
import CouncilBreakdownChart from "../components/CouncilBreakdownChart";
import StackedRegionChart from "../components/StackedRegionChart";
import CouncilPieChart from "../components/CouncilPieChart";
import ExecutiveSummary from "../components/ExecutiveSummary";

export default function CoordinatorsCapacitated() {
  const regionTotals = data.map(region => {
    const avg = region.councils.reduce((sum, c) => sum + (c.percentage_of_npa_vawc_coordinators_capacitated || 0), 0) / region.councils.length;
    return { region: region.region, total: +avg.toFixed(1) };
  });

  const [selectedRegion, setSelectedRegion] = useState(null);

  const regionCouncilData = aggregateCouncilsByRegion(
    data,
    "percentage_of_npa_vawc_coordinators_capacitated"
  );

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
  };

  const selectedRegionData = data.find(
    (region) => region.region === selectedRegion
  );


  return (
    <div>
      <h1 className="text-2xl font-bold">NPA-VAWC Coordinators Capacitated</h1>
      <ExecutiveSummary
        indicator="percentage_of_npa_vawc_coordinators_capacitated"
        target={1000000}
        title="Coordinators Capacitated"
      />
      <StackedRegionChart
        data={regionCouncilData}
        indicator="percentage_of_npa_vawc_coordinators_capacitated"
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
              "percentage_of_npa_vawc_coordinators_capacitated"
            )}
          />
        </div>
      )}
    </div>
  );
}
