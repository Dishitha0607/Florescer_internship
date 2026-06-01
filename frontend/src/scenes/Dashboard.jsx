import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import { useEffect, useState } from "react";
import { tokens } from "../theme";
import StatBox from "./charts/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ModelTrainingOutlinedIcon from "@mui/icons-material/ModelTrainingOutlined";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

import Header from "../components/Header";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";

// TEMP DATA IMPORTS / MOCKS
import { chartData } from "../data/chartData";
import { monthlyBudgetData } from "../data/barData";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const lineData = [
    {
      id: "Ideas Received",
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

  // ----------PIE CHART------------
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

  // ONLY APPROVED KAIZEN
  const approvedIdeas = ideas.filter(
    (idea) => idea.kaizen_status === "Approved",
  );
  // COUNT CLASSIFICATIONS
  const classificationMap = {};

  approvedIdeas.forEach((idea) => {
    const c = idea.classification || "Other";
    classificationMap[c] = (classificationMap[c] || 0) + 1;
  });

  // CONVERT TO NIVO FORMAT
  const pieData = Object.keys(classificationMap).map((key) => ({
    id: key,
    label: key,
    value: classificationMap[key],
  }));

  // -----------------
  // Dashboard Stats
  // -----------------
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  // ------------------
  // Fetch stats
  // ------------------
  const fetchStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboardStats");
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error("Dashboard Stats Error:", error);
    }
  };

  // -----------
  // Load Data
  // -----------
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className="m-[20px]">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </div>

        {/* STAT CARDS */}
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
          {/* TOTAL */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="20px"
          >
            <StatBox
              title={stats.total}
              subtitle="Total Ideas"
              icon={
                <ModelTrainingOutlinedIcon
                  sx={{
                    color: colors.greenAccent[500],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>

          {/* PENDING */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="20px"
          >
            <StatBox
              title={stats.pending}
              subtitle="Pending Ideas"
              icon={
                <PendingActionsOutlinedIcon
                  sx={{
                    color: colors.blueAccent[500],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>

          {/* ACCEPTED */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="20px"
          >
            <StatBox
              title={stats.accepted}
              subtitle="Accepted Ideas"
              icon={
                <ThumbUpAltOutlinedIcon
                  sx={{
                    color: colors.greenAccent[500],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>

          {/* REJECTED */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="20px"
          >
            <StatBox
              title={stats.rejected}
              subtitle="Rejected Ideas"
              icon={
                <ThumbDownOffAltOutlinedIcon
                  sx={{
                    color: colors.blueAccent[500],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
        </Box>

        {/* CHART SECTION */}
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="300px"
          gap="20px"
        >
          {/* LINE CHART */}
          <Box
            gridColumn="span 8"
            backgroundColor={colors.primary[400]}
            p="20px"
            borderRadius="10px"
          >
            <Typography variant="h5" fontWeight="600" mb="10px">
              Ideas vs Accepted Kaizens
            </Typography>

            <Box height="240px">
              <LineChart data={lineData} />
            </Box>
          </Box>

          {/* PIE CHART */}
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            p="20px"
            borderRadius="10px"
          >
            <Typography variant="h5" fontWeight="600" mb="10px">
              Kaizen Classifications
            </Typography>

            <Box height="240px">
              <PieChart data={pieData} />
            </Box>
          </Box>

          {/* BAR CHART */}
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            p="20px"
            borderRadius="10px"
          >
            <Typography variant="h5" fontWeight="600" mb="10px">
              Monthly Budget Analytics
            </Typography>

            <Box height="300px">
              <BarChart data={monthlyBudgetData} isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
