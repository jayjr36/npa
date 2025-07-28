import data from "../data.json";

export default function Home() {
  // Aggregate overview stats
  const regionsCount = data.length;
  const councilsCount = data.reduce((total, region) => total + region.councils.length, 0);
  const totalReached = data.reduce((sum, region) =>
    sum + region.councils.reduce((s, c) => s + (c.number_of_community_members_reached || 0), 0), 0
  );
  const totalTrained = data.reduce((sum, region) =>
    sum + region.councils.reduce((s, c) => s + (c.number_of_law_enforcement_agents_trained || 0), 0), 0
  );
  const totalHelpSought = data.reduce((sum, region) =>
    sum + region.councils.reduce((s, c) => s + (c.number_of_women_who_sought_help || 0), 0), 0
  );

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-primary mb-2">
          NPA-VAWC
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to the national-level performance dashboard. This platform provides real-time insights on the progress of key indicators tracked across all regions and councils in Tanzania.
        </p>

        <p className="text-gray-600 mb-6">
          Use the sidebar to navigate thematic areas such as community outreach, women's access to banking, VAWC case tracking, school reporting mechanisms, and law enforcement training.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-white">
          <div className="bg-blue-500 rounded p-4 shadow">
            <h2 className="text-xl font-bold">{regionsCount}</h2>
            <p>Regions Tracked</p>
          </div>
          <div className="bg-green-600 rounded p-4 shadow">
            <h2 className="text-xl font-bold">{councilsCount}</h2>
            <p>Councils Reporting</p>
          </div>
          <div className="bg-blue-600 rounded p-4 shadow">
            <h2 className="text-xl font-bold">{totalReached.toLocaleString()}</h2>
            <p>Community Members Reached</p>
          </div>
          <div className="bg-yellow-600 rounded p-4 shadow">
            <h2 className="text-xl font-bold">{totalTrained.toLocaleString()}</h2>
            <p>Law Enforcers Trained</p>
          </div>
          <div className="bg-red-600 rounded p-4 shadow">
            <h2 className="text-xl font-bold">{totalHelpSought.toLocaleString()}</h2>
            <p>Women Who Sought Help</p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            This dashboard supports national monitoring of VAWC (Violence Against Women and Children) and social development interventions under the NPA-VAWC framework.
          </p>
          <p className="mt-2 italic">
            Built for policymakers, stakeholders, and planners to visualize real-time progress.
          </p>
        </div>
      </div>
    </div>
  );
}
