import { useEffect, useState } from "react";
import Logout from "../components/Logout";

import StatsCards from "../components/admin/StatsCards";
import IdeasTable from "../components/admin/IdeasTable";
import IdeaDetailsModal from "../components/admin/IdeaDetailsModal";

function Admin() {
  const [ideas, setIdeas] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  // FETCH IDEAS
  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/adminIdeas");
      const data = await res.json();

      setIdeas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboardStats");
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
    fetchStats();
  }, []);

  // ACCEPT IDEA
  const handleAccept = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/approveIdea/${selectedIdea.idea_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(rating),
          feedback,
        }),
      });

      fetchIdeas();
      fetchStats();

      setShowDetails(false);
      setSelectedIdea(null);

      setRating(5);
      setFeedback("");

      alert("Idea Accepted");
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT IDEA
  const handleReject = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/rejectIdea/${selectedIdea.idea_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(rating),
          feedback,
        }),
      });

      fetchIdeas();
      fetchStats();

      setShowDetails(false);
      setSelectedIdea(null);

      setFeedback("");

      alert("Idea Rejected");
    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE KAIZEN
  const handleKaizenApprove = async () => {
    try {
      await fetch(
        `http://127.0.0.1:8000/approveKaizen/${selectedIdea.idea_id}`,
        {
          method: "PUT",
        },
      );

      fetchIdeas();

      alert("Kaizen Approved");

      setShowDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT KAIZEN
  const handleKaizenReject = async () => {
    try {
      await fetch(
        `http://127.0.0.1:8000/rejectKaizen/${selectedIdea.idea_id}`,
        {
          method: "PUT",
        },
      );

      fetchIdeas();

      alert("Kaizen Rejected");

      setShowDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif">
          Admin <span className="text-primary italic">Dashboard</span>
        </h2>

        <Logout />
      </div>

      {/* STATS */}
      <StatsCards stats={stats} />

      {/* TABLE */}
      <IdeasTable
        ideas={ideas}
        onSelectIdea={(idea) => {
          setSelectedIdea(idea);

          setRating(idea.rating || 5);
          setFeedback(idea.admin_feedback || "");

          setShowDetails(true);
        }}
      />

      {/* MODAL */}
      {showDetails && selectedIdea && (
        <IdeaDetailsModal
          selectedIdea={selectedIdea}
          rating={rating}
          feedback={feedback}
          setRating={setRating}
          setFeedback={setFeedback}
          onClose={() => setShowDetails(false)}
          onAccept={handleAccept}
          onReject={handleReject}
          onKaizenApprove={handleKaizenApprove}
          onKaizenReject={handleKaizenReject}
        />
      )}
    </div>
  );
}

export default Admin;
