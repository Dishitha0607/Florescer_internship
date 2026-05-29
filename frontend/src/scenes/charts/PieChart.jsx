import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const PieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, left: 80, bottom: 80 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "category10" }}
        borderWidth={1}
        borderColor={{ from: "color", modifieres: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLinkLabelsColor="#ffffff"
        tooltip={({ datum }) => (
          <div
            style={{
              padding: 12,
              background: "#222",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <strong>{datum.id}</strong>
            <br />
            <strong>{datum.value}</strong>
          </div>
        )}
        theme={{
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 140,
            itemHeight: 18,
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
    </>
  );
};

export default PieChart;

