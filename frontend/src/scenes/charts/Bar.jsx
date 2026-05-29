import { Box, Typography } from "@mui/material";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { monthlyBudgetData } from "../../data/barData";

const Bar = () => {
  // const [ideas, setIdeas] = useState([]);

  // useEffect(() => {
  //   fetchIdeas();
  // }, []);

  // const fetchIdeas = async () => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/adminIdeas");
  //     const data = await res.json();

  //     setIdeas(Array.isArray(data) ? data : []);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const monthlyBudgetData = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ].map((month, index) => {
  //   const total = ideas
  //     .filter((idea) => {
  //       const date = new Date(idea.created_at);

  //       return date.getMonth() === index && idea.kaizen_status === "Approved";
  //     })
  //     .reduce((sum, idea) => sum + Number(idea.actual_budget || 0), 0);

  //   return {
  //     month,
  //     budget: total,
  //   };
  // });

  // console.log(monthlyBudgetData);
  // return (
  //   <div className="m-[20px]">
  //     <Header
  //       title="Monthly Budget Analytics"
  //       subtitle="Per-month expenditures"
  //     />

  //     <Box height="75vh">
  //       <BarChart data={monthlyBudgetData} />
  //     </Box>
  //   </div>
  // );

  return (
    <>
      <div className="m-[20px]">
        <Header
          title="Monthly Budget Analytics"
          subtitle="Per-month expenditures"
        />
        <Box height="75vh">
          <BarChart data={monthlyBudgetData} />
        </Box>
      </div>
    </>
  );
};

export default Bar;
