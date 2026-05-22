import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";

import { useState } from "react";
import Logout from "../components/common/Logout";
import StatCards from "../components/admin/StatCards";
import IdeasTable from "../components/admin/IdeasTable";
import IdeaDetailsModal from "../components/admin/IdeaDetailsModal";
import { useAdminData } from "../hooks/useAdminData";

const AdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { ideas, stats, fetchIdeas, fetchStats } = useAdminData();

  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleSelect = (idea) => setSelectedIdea(idea);
  const handleClose = () => setSelectedIdea(null);

  const handleRefresh = () => {
    fetchIdeas();
    fetchStats();
  };

  return (
    <div className="m-[20px] text-[16.7px]">
      <Header title="ADMIN DASHBOARD" subtitle="Manage ideas and statistics" />

      <div className="flex justify-end ">
        <Logout />
      </div>

      <Box
        sx={{
          backgroundColor: colors.primary[400],
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <StatCards stats={stats} />

        <div className="mt-6">
          <IdeasTable ideas={ideas} onSelect={handleSelect} />
        </div>
      </Box>

      {selectedIdea && (
        <IdeaDetailsModal
          idea={selectedIdea}
          onClose={handleClose}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
