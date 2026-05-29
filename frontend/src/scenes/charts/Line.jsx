import { Box, Typography } from "@mui/material";
import LineChart from "./LineChart";
import { date } from "yup";
import Header from "../../components/Header";
import { X } from "lucide-react";
import { chartData } from "../../data/chartData";

const Line = () => {
  const lineData = [
    {
      id: " Ideas Received",
      data: chartData.map((item) => ({
        x: item.month,
        y: item.ideas_received,
      })),
    },

    {
      id: "Accepted Kaizen",
      data: chartData.map((item) => ({
        x: item.month,
        y: item.accepted_kaizens,
      })),
    },
  ];

  return (
    <>
      <div className="m-[20px]">
        <Header
          title="IDEAS ACCEPTED"
          subtitle="Line Chart for Keeping track of the Accepted Ideas"
        />
        <Box height="75vh" width="100%">
          <LineChart data={lineData} />
        </Box>
      </div>
    </>
  );
};

export default Line;
