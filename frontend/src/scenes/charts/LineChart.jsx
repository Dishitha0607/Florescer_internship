import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const LineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <ResponsiveLine
        data={data}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: -70,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto", stacked: false }}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
        colors={{ scheme: "category10" }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
              },
              text: {
                fill: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fontSize:15,
              fill: colors.grey[100],
            },
          },
          grid: {
            line: {
              stroke: colors.grey[800],
            },
          },
          tooltip: {
            container: {
              background: "#222",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export default LineChart;
