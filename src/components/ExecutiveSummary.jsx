import data from "../data.json";

export default function ExecutiveSummary({ indicator, target, title }) {
  const nationalTotal = data.reduce((sum, region) => {
    return (
      sum +
      region.councils.reduce((sub, council) => sub + (council[indicator] || 0), 0)
    );
  }, 0);

  const percentage = ((nationalTotal / target) * 100).toFixed(1);
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
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-6 transition hover:shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Executive Summary — {title}
      </h2>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span> National Target:</span>
          <span className="font-medium text-gray-900">{target.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Actual Reached:</span>
          <span className="font-medium text-gray-900">{nationalTotal.toLocaleString()}</span>
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
