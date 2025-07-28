export function getAllCouncilKeys(data) {
  const keys = new Set();
  data.forEach(region => {
    Object.keys(region).forEach(key => {
      if (key !== "region") {
        keys.add(key);
      }
    });
  });
  return Array.from(keys);
}
