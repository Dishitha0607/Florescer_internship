import { useState } from "react";
import Button from "../components/common/Button";
import Logout from "../components/common/Logout";
import { useEmployeeData } from "../hooks/useEmployeeData";
import StatCards from "../components/employee/StatCards";
import IdeasTable from "../components/employee/IdeasTable";
import RatingsTable from "../components/employee/RatingsTable";
import NewIdeaModal from "../components/employee/NewIdeaModal";
import IdeaDetailsModal from "../components/employee/IdeaDetailsModal";
import KaizenModal from "../components/employee/KaizenModal";

function Employee1() {
  const { ideas, stats, employeeStars, fetchIdeas, fetchStats } = useEmployeeData();

  const [showForm, setShowForm] = useState(false);
  const [errors, setError] = useState({});
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("ideas");

  const [formData, setFormData] = useState({
    classification: "",
    budget: "",
    subject: "",
    details: "",
    targetDate: "",
    employeeEmail: "emp@test.com",
    empName: "",
  });

  const [showKaizenPopup, setShowKaizenPopup] = useState(false);
  const [kaizenData, setKaizenData] = useState({
    actualBudget: "",
    implementationDetails: "",
    implementationImage: null,
  });

  const canEditKaizen =
    selectedIdea?.status === "Accepted" &&
    selectedIdea?.kaizen_status !== "Kaizen Submitted";

  const handleSubmit = async () => {
    let newErrors = {};
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.empName.trim()) newErrors.empName = "Employee name is required";
    if (!formData.classification.trim()) newErrors.classification = "Classification is required";
    if (!formData.targetDate) newErrors.targetDate = "Target date is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.details.trim()) newErrors.details = "Details are required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});

    const payload = {
      classification: formData.classification,
      budget: formData.budget,
      subject: formData.subject,
      details: formData.details,
      targetDate: formData.targetDate,
      employeeEmail: formData.employeeEmail,
      empName: formData.empName,
      currentDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/addIdea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Submitted:", data);
      fetchIdeas();
      fetchStats();
      setFormData({ classification: "", budget: "", subject: "", details: "", targetDate: "", employeeEmail: "emp@test.com", empName: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedIdea) return;
      const payload = {
        classification: selectedIdea.classification,
        budget: Number(selectedIdea.budget),
        subject: selectedIdea.subject,
        details: selectedIdea.details,
        targetDate: selectedIdea.target_date || selectedIdea.targetDate,
        empName: selectedIdea.emp_name,
      };
      const res = await fetch(`http://127.0.0.1:8000/updateIdea/${selectedIdea.idea_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");
      const refreshed = await fetchIdeas();
      const freshIdea = refreshed.find((i) => i.idea_id === selectedIdea.idea_id);
      setSelectedIdea(freshIdea);
      setEditMode(false);
      alert("Saved successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleKaizenSubmit = async () => {
    try {
      if (!kaizenData.actualBudget || !kaizenData.implementationDetails) {
        alert("Please fill required fields");
        return;
      }
      const formDataObj = new FormData();
      formDataObj.append("actual_budget", kaizenData.actualBudget);
      formDataObj.append("implementation_details", kaizenData.implementationDetails);
      if (kaizenData.implementationImage) {
        formDataObj.append("image", kaizenData.implementationImage);
      }
      const res = await fetch(`http://127.0.0.1:8000/submitKaizen/${selectedIdea.idea_id}`, {
        method: "PUT",
        body: formDataObj,
      });
      const data = await res.json();
      console.log(data);
      const refreshIdeas = await fetchIdeas();
      const updateIdea = refreshIdeas.find((idea) => idea.idea_id === selectedIdea.idea_id);
      setSelectedIdea(updateIdea);
      setShowKaizenPopup(false);
      alert("KAIZEN saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleForward = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/forwardIdea/${selectedIdea.idea_id}`, { method: "PUT" });
      const data = await res.json();
      console.log(data);
      fetchIdeas();
      fetchStats();
      setShowDetails(false);
      setSelectedIdea(null);
      alert("Idea forwarded successfully");
    } catch (error) {
      console.error("Forward error:", error);
    }
  };

  const handleKaizenForward = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/forwardKaizen/${selectedIdea.idea_id}`, { method: "PUT" });
      const data = await res.json();
      console.log(data);
      fetchIdeas();
      fetchStats();
      setShowKaizenPopup(false);
      setSelectedIdea(null);
      alert("Kaizen forwarded successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif">
            Employee <span className="text-primary italic">Dashboard</span>
          </h2>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="animation-fade-in animation-delay-200 bg-blue-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 transition animation-fade-in animation-delay-200"
        >
          + New Idea
        </Button>
        <Logout />
      </div>

      <IdeaDetailsModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        selectedIdea={selectedIdea}
        setSelectedIdea={setSelectedIdea}
        editMode={editMode}
        setEditMode={setEditMode}
        handleUpdate={handleUpdate}
        handleForward={handleForward}
        setShowKaizenPopup={setShowKaizenPopup}
        setKaizenData={setKaizenData}
      />

      <KaizenModal
        showKaizenPopup={showKaizenPopup}
        setShowKaizenPopup={setShowKaizenPopup}
        selectedIdea={selectedIdea}
        kaizenData={kaizenData}
        setKaizenData={setKaizenData}
        canEditKaizen={canEditKaizen}
        handleKaizenSubmit={handleKaizenSubmit}
        handleKaizenForward={handleKaizenForward}
      />

      <StatCards stats={stats} />

      {/* TABLE */}
      <div className="mt-10 glass rounded-3xl p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("ideas")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${activeTab === "ideas" ? "bg-primary text-white" : "bg-surface"}`}
          >
            Submitted Ideas
          </button>
          <button
            onClick={() => setActiveTab("ratings")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${activeTab === "ratings" ? "bg-primary text-white" : "bg-surface"}`}
          >
            Employee Ratings
          </button>
        </div>

        {activeTab === "ideas" ? (
          <IdeasTable
            ideas={ideas}
            onSelect={(idea) => {
              setSelectedIdea(idea);
              setShowDetails(true);
            }}
          />
        ) : (
          <RatingsTable employeeStars={employeeStars} />
        )}
      </div>

      <NewIdeaModal
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Employee1;