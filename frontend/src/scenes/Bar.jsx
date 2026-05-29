import { Box, Typography } from "@mui/material";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";

const Bar = () => {
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

  const monthlyBudgetData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month, index) => {
    const total = ideas
      .filter((idea) => {
        const date = new Date(idea.created_at);

        return date.getMonth() === index && idea.kaizen_status === "Approved";
      })
      .reduce((sum, idea) => sum + Number(idea.actual_budget || 0), 0);

    return {
      month,
      budget: total,
    };
  });

  console.log(monthlyBudgetData);
  return (
    <Box m="20px">
      <Typography variant="h3" fontWeight="bold" mb="20px">
        Monthly Budget Analytics
      </Typography>

      <Box height="75vh">
        <BarChart data={monthlyBudgetData} />
      </Box>
    </Box>
  );
};

export default Bar;
