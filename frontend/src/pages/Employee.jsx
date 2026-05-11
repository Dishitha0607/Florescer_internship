import { useEffect, useState } from "react";

import Button from "../components/Button";
import Logout from "../components/Logout";

import EmployeeStats from "../components/employee/EmployeeStats";
import EmployeeIdeasTable from "../components/employee/EmployeeIdeasTable";
import EmployeeRatingsTable from "../components/employee/EmployeeRatingsTable";

import IdeaDetailsModal from "../components/employee/IdeaDetailsModal";
import KaizenModal from "../components/employee/KaizenModal";
import NewIdeaModal from "../components/employee/NewIdeaModal";

function Employee() {
  const [showForm, setShowForm] = useState(false);

  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [activeTab, setActiveTab] = useState("ideas");

  const [ideas, setIdeas] = useState([]);

  const [employeeStars, setEmployeeStars] = useState([]);

  const [showKaizenPopup, setShowKaizenPopup] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    forwarded: 0,
  });

  const [formData, setFormData] = useState({
    classification: "",
    budget: "",
    subject: "",
    details: "",
    targetDate: "",
    employeeEmail: "emp@test.com",
    empName: "",
  });

  const [kaizenData, setKaizenData] = useState({
    actualBudget: "",
    implementationDetails: "",
    implementationImage: null,
  });

  // FETCH IDEAS
  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ideas?email=emp@test.com");

      const data = await res.json();

      setIdeas(Array.isArray(data) ? data : []);

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.log(error);
      return [];
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

  // FETCH STARS
  const fetchEmployeeStars = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/employeeStars");

      const data = await res.json();

      setEmployeeStars(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
    fetchStats();
    fetchEmployeeStars();
  }, []);

  return (
    <div className="min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif">
          Employee <span className="text-primary italic">Dashboard</span>
        </h2>

        <div className="flex gap-4">
          <Button onClick={() => setShowForm(true)}>
            + New Idea
          </Button>

          <Logout />
        </div>
      </div>

      {/* STATS */}
      <EmployeeStats stats={stats} />

      {/* TABLE */}
      <div className="mt-10 glass rounded-3xl p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("ideas")}
            className={`px-5 py-2 rounded-xl ${
              activeTab === "ideas"
                ? "bg-primary text-white"
                : "bg-surface"
            }`}
          >
            Submitted Ideas
          </button>

          <button
            onClick={() => setActiveTab("ratings")}
            className={`px-5 py-2 rounded-xl ${
              activeTab === "ratings"
                ? "bg-primary text-white"
                : "bg-surface"
            }`}
          >
            Employee Ratings
          </button>
        </div>

        {activeTab === "ideas" ? (
          <EmployeeIdeasTable
            ideas={ideas}
            onSelectIdea={(idea) => {
              setSelectedIdea(idea);
              setShowDetails(true);
            }}
          />
        ) : (
          <EmployeeRatingsTable employeeStars={employeeStars} />
        )}
      </div>

      {/* IDEA DETAILS */}
      {showDetails && selectedIdea && (
        <IdeaDetailsModal
          selectedIdea={selectedIdea}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedIdea={setSelectedIdea}
          onClose={() => {
            setShowDetails(false);
            setEditMode(false);
          }}
        />
      )}

      {/* NEW IDEA */}
      {showForm && (
        <NewIdeaModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* KAIZEN */}
      {showKaizenPopup && selectedIdea && (
        <KaizenModal
          selectedIdea={selectedIdea}
          kaizenData={kaizenData}
          setKaizenData={setKaizenData}
          onClose={() => setShowKaizenPopup(false)}
        />
      )}
    </div>
  );
}

export default Employee;