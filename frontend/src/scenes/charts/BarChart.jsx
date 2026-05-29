import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const BarChart = ({ data, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      animate={true}
      motionConfig="gentle"
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["budget"]}
      indexBy="month"
      margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      borderRadius={6}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.2]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Budget($)",
        legendPosition: "middle",
        legendOffset: -70,
        format: (value) => `${(value / 1000).toFixed(0)}k`,
      }}
      enableLabel={false}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`
      }
      valueFormat={(value) => `${value.toLocaleString()}`}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: "10px 14px",
            background: "#1F2A40",
            color: "white",
            borderRadius: "8px",
            border: `1px solid ${color}`,
          }}
        >
          <strong>{id}</strong>: ₹ {Number(value).toLocaleString()}
        </div>
      )}
    />
  );
};

export default BarChart;
