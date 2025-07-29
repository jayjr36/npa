import data from "../data.json";

export default function Home() {
  // Aggregate stats from available indicators
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
    <div className="p-6 space-y-10">
      {/* Header and Introduction */}
      <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-gray-700 mb-2">
          Welcome to the National Plan of Action to End Violence Against Women and Children (NPA-VAWC) dashboard.
          This platform provides data-driven insights from regions and councils across Tanzania to support strategic decision-making and coordination.
        </p>
        <p className="text-gray-600 text-sm italic">
          Use the sidebar to explore thematic areas and visualize progress on key indicators.
        </p>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        <div className="bg-blue-600 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">{regionsCount}</h2>
          <p className="text-sm">Regions Tracked</p>
        </div>
        <div className="bg-green-600 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">{councilsCount}</h2>
          <p className="text-sm">Councils Reporting</p>
        </div>
        <div className="bg-purple-600 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">{totalReached.toLocaleString()}</h2>
          <p className="text-sm">Community Members Reached</p>
        </div>
        <div className="bg-yellow-600 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">{totalTrained.toLocaleString()}</h2>
          <p className="text-sm">Law Enforcers Trained</p>
        </div>
        {/* <div className="bg-red-600 p-4 rounded shadow text-center">
          <h2 className="text-2xl font-bold">{totalHelpSought.toLocaleString()}</h2>
          <p className="text-sm">Women Who Sought Help</p>
        </div> */}
      </div>

      {/* Thematic Areas */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">🧭 Thematic Areas Overview</h3>
        <p className="text-gray-700 mb-6 text-sm">
          The NPA-VAWC framework is built around eight thematic areas to address root causes and responses to violence. Explore below to understand each domain’s role.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ThematicCard
            title="1. Coordination, Monitoring and Evaluation"
            description="Strengthens national and sub-national systems for planning, coordination, data collection, and reporting to ensure accountability and visibility of VAWC interventions."
          />
          <ThematicCard
            title="2. Household Economic Strengthening"
            description="Promotes women's economic empowerment and access to financial services to reduce dependency and vulnerability to violence."
          />
          <ThematicCard
            title="3. Norms and Values"
            description="Targets harmful social and gender norms by promoting behavior change through community dialogues, education, and mass media."
          />
          <ThematicCard
            title="4. Safe Environment in Public Spaces"
            description="Ensures safety of women and children in public places including transportation, schools, streets, and workplaces through policy, infrastructure, and public engagement."
          />
          <ThematicCard
            title="5. Parenting, Family Supports and Relationships"
            description="Improves parenting practices, family stability, and conflict resolution to reduce domestic violence and child abuse."
          />
          <ThematicCard
            title="6. Implementation and Enforcement of Laws"
            description="Strengthens enforcement of laws and capacity of law enforcers to prosecute offenders and uphold the rights of survivors."
          />
          <ThematicCard
            title="7. Response and Supportive Services"
            description="Improves access to quality multi-sectoral services including medical care, psychosocial support, legal aid, and shelters for survivors."
          />
          <ThematicCard
            title="8. Safe Education and Life Skills"
            description="Focuses on school safety and empowering learners with life skills to prevent violence and report abuse."
          />
        </div>
      </div>

      {/* Footer Description */}
      {/* <div className="mt-10 text-sm text-gray-500">
        <p>
          This system is designed for policymakers, planners, and implementing partners to monitor and improve efforts to end violence against women and children across Tanzania.
        </p>
        <p className="mt-1 italic">Powered by the NPA-VAWC Monitoring and Evaluation Framework.</p>
      </div> */}
    </div>
  );
}

// Reusable Card Component
function ThematicCard({ title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h4 className="text-base font-semibold text-blue-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}