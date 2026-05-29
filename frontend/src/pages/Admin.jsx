import { useState } from "react";
import Logout from "../components/common/Logout";
import StatCards from "../components/admin/StatCards";
import IdeasTable from "../components/admin/IdeasTable";
import IdeaDetailsModal from "../components/admin/IdeaDetailsModal";
import { useAdminData } from "../hooks/useAdminData";

function Admin() {
  const { ideas, stats, fetchIdeas, fetchStats } = useAdminData();
  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleSelect = (idea) => setSelectedIdea(idea);
  const handleClose = () => setSelectedIdea(null);
  const handleRefresh = () => {
    fetchIdeas();
    fetchStats();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center flex-wrap mb-8">
        {/* TITLE */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif">
          Admin <span className="text-primary italic">Dashboard</span>
        </h2>
        <div className="flex items-center gap-3">
          <Logout />
        </div>
      </div>

      <StatCards stats={stats} />
      <IdeasTable ideas={ideas} onSelect={handleSelect} />

      {selectedIdea && (
        <IdeaDetailsModal
          idea={selectedIdea}
          onClose={handleClose}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}

export default Admin;
