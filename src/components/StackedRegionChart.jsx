import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllCouncilKeys } from "../utils/helpers";

export default function StackedRegionChart({ data, indicator, onBarClick }) {
  const councilKeys = getAllCouncilKeys(data);

  return (
    <div className="bg-white rounded shadow p-4">

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          onClick={(e) => {
            if (e && e.activeLabel) {
              onBarClick(e.activeLabel);
            }
          }}
        >
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          {/* <Tooltip labelStyle={color: "black"} /> */}
          {/* Legend removed intentionally */}
          {councilKeys.map((council, index) => (
            <Bar
              key={council}
              dataKey={council}
              stackId="a"
              fill={[
                "#A8DADC", // soft teal
                "#F1FAEE", // off-white
                "#E5989B", // muted rose
                "#B5EAD7", // pastel mint
                "#FFDAC1", // soft peach
                "#CDE7FF", // light blue
                "#FFE5EC", // light pink
                "#C3FBD8", // very soft green
              ][index % 8]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
