export function aggregateIndicatorByRegion(data, key) {
  return data.map(region => {
    const total = region.councils.reduce((sum, council) => sum + (council[key] || 0), 0);
    return { region: region.region, total };
  });
}

// export function getCouncilsContribution(regionData, key) {
//   return regionData.councils.map(council => ({
//     name: council.name,
//     value: council[key] || 0,
//   }));
// }

export function aggregateCouncilsByRegion(data, indicator) {
  return data.map(region => {
    const regionObj = { region: region.region };
    region.councils.forEach(council => {
      regionObj[council.name] = council[indicator];
    });
    return regionObj;
  });
}

export function getCouncilsContribution(region, indicator) {
  return region.councils.map(council => ({
    name: council.name,
    value: council[indicator],
  }));
}
