import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PieChart from "./PieChart";

const Pie = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/adminIdeas");
      const data = await res.json();

      setIdeas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // ONLY APPROVED KAIZENS
  const approvedIdeas = ideas.filter(
    (idea) => idea.kaizen_status === "Approved",
  );

  // COUNT CLASSIFICATIONS
  const classificationMap = {};

  approvedIdeas.forEach((idea) => {
    const classification = idea.classification || "Other";

    classificationMap[classification] =
      (classificationMap[classification] || 0) + 1;
  });

  // CONVERT TO NIVO FORMAT
  const pieData = Object.keys(classificationMap).map((key) => ({
    id: key,
    label: key,
    value: classificationMap[key],
  }));

  return (
    <Box m="20px">
      <Typography variant="h3" fontWeight="bold" mb="20px">
        Approved Kaizen Classification Analytics
      </Typography>

      <Box height="75vh">
        <PieChart data={pieData} />
      </Box>
    </Box>
  );
};

export default Pie;
