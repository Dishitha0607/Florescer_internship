import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Logout from "../components/common/Logout";

function Employee1() {
  const [showForm, setShowForm] = useState(false);

  // Error state
  const [errors, setError] = useState({});

  //pop-up for details
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    classification: "",
    budget: "",
    subject: "",
    details: "",
    targetDate: "",
    employeeEmail: "emp@test.com",
    empName: "",
  });

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    forwarded: 0,
  });

  const [ideas, setIdeas] = useState([]);

  const [showKaizenPopup, setShowKaizenPopup] = useState(false);
  const [kaizenData, setKaizenData] = useState({
    actualBudget: "",
    implementationDetails: "",
    implementationImage: null,
  });

  const canEditKaizen =
    selectedIdea?.status === "Accepted" &&
    selectedIdea?.kaizen_status !== "Kaizen Submitted";

  //state for total stars:
  const [employeeStars, setEmployeeStars] = useState([]);

  // stats for stars tab:
  const [activeTab, setActiveTab] = useState("ideas");

  // FETCH STARS:
  const fetchEmployeeStars = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/employeeStars");
      const data = await res.json();

      setEmployeeStars(data);
    } catch (err) {
      console.log(error);
    }
  };

  // FETCH IDEAS
  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ideas?email=emp@test.com");
      const data = await res.json();

      setIdeas(Array.isArray(data) ? data : []);

      return Array.isArray(data) ? data : []; // 🔥 MUST
    } catch (error) {
      console.error(error);
      return []; // 🔥 MUST
    }
  };

  // FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboardStats");

      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Stats fetch error:", error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchIdeas();
    fetchStats();
    fetchEmployeeStars();
  }, []);

  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.empName.trim()) {
      newErrors.empName = "Employee name is required";
    }

    if (!formData.classification.trim()) {
      newErrors.classification = "Classification is required";
    }

    if (!formData.targetDate) {
      newErrors.targetDate = "Target date is required";
    }

    if (!formData.budget) {
      newErrors.budget = "Budget is required";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Details are required";
    }

    // STOP submit if errors exist
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    // clear errors if valid
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("Submitted:", data);

      fetchIdeas();
      fetchStats();

      setFormData({
        classification: "",
        budget: "",
        subject: "",
        details: "",
        targetDate: "",
        employeeEmail: "emp@test.com",
        empName: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // Handling Update
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

      const res = await fetch(
        `http://127.0.0.1:8000/updateIdea/${selectedIdea.idea_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Update failed");
      }

      // 🔥 STEP 1: refresh from DB
      const refreshed = await fetchIdeas();

      // 🔥 STEP 2: get fresh record from DB
      const freshIdea = refreshed.find(
        (i) => i.idea_id === selectedIdea.idea_id,
      );

      // 🔥 STEP 3: update popup with DB truth
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
      formDataObj.append(
        "implementation_details",
        kaizenData.implementationDetails,
      );

      // ✅ IMAGE OPTIONAL
      if (kaizenData.implementationImage) {
        formDataObj.append("image", kaizenData.implementationImage);
      }

      const res = await fetch(
        `http://127.0.0.1:8000/submitKaizen/${selectedIdea.idea_id}`,
        {
          method: "PUT",
          body: formDataObj,
        },
      );

      const data = await res.json();
      console.log(data);

      const refreshIdeas = await fetchIdeas();
      const updateIdea = refreshIdeas.find(
        (idea) => idea.idea_id === selectedIdea.idea_id,
      );

      setSelectedIdea(updateIdea);
      setShowKaizenPopup(false);

      alert("KAIZEN saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // Handling Forward
  const handleForward = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/forwardIdea/${selectedIdea.idea_id}`,
        {
          method: "PUT",
        },
      );

      const data = await res.json();

      console.log(data);

      // reload ideas + stats
      fetchIdeas();
      fetchStats();

      // close popup
      setShowDetails(false);
      setSelectedIdea(null);

      alert("Idea forwarded successfully");
    } catch (error) {
      console.error("Forward error:", error);
    }
  };

  const handleKaizenForward = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/forwardKaizen/${selectedIdea.idea_id}`,
        {
          method: "PUT",
        },
      );

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
          className="animation-fade-in animation-delay-200 bg-blue-500
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-600
          transition
          animation-fade-in
          animation-delay-200 "
        >
          + New Idea
        </Button>

        <Logout />
      </div>

      {/* Details pop-up when u click on the idea_id */}
      {showDetails && selectedIdea && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="glass-strong w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl p-8 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2>Idea Details</h2>
              <button
                className="text-red-400 text-2xl"
                onClick={() => {
                  setShowDetails(false);
                  setEditMode(false);
                }}
              >
                ✕
              </button>
            </div>

            {/* Idea Id */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Idea Id</p>
              <h3 className="text-xl font-semibold text-primary">
                {selectedIdea.idea_id}
              </h3>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Subject</p>
              {editMode ? (
                <input
                  type="text"
                  value={selectedIdea.subject}
                  onChange={(e) =>
                    setSelectedIdea({
                      ...selectedIdea,
                      subject: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-surface border border-border"
                />
              ) : (
                <h3 className="text-lg">{selectedIdea.subject}</h3>
              )}
            </div>

            {/* Classification */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Classification</p>
              {editMode ? (
                <input
                  type="text"
                  value={selectedIdea.classification}
                  onChange={(e) =>
                    setSelectedIdea({
                      ...selectedIdea,
                      classification: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-surface border border-border"
                />
              ) : (
                <h3 className="text-lg">{selectedIdea.classification}</h3>
              )}
            </div>

            {/* Budget */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Budget</p>
              {editMode ? (
                <input
                  type="number"
                  value={selectedIdea.budget}
                  onChange={(e) =>
                    setSelectedIdea({ ...selectedIdea, budget: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-surface border border-border"
                />
              ) : (
                <h3 className="text-lg">{selectedIdea.budget}</h3>
              )}
            </div>

            {/* Rating */}
            {selectedIdea.rating && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Admin Rating</p>

                <h3 className="text-lg">{"⭐".repeat(selectedIdea.rating)}</h3>
              </div>
            )}

            {/* Admin Feedback */}
            {selectedIdea.admin_feedback && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Admin Feedback</p>
                <h3 className="text-lg">{selectedIdea.admin_feedback}</h3>
              </div>
            )}

            {/* Details */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Details</p>
              {editMode ? (
                <input
                  type="text"
                  value={selectedIdea.details}
                  onChange={(e) =>
                    setSelectedIdea({
                      ...selectedIdea,
                      details: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-xl bg-surface border border-border"
                />
              ) : (
                <h3 className="text-lg">{selectedIdea.details}</h3>
              )}
            </div>

            {/* BUTTON */}
            <div className="flex gap-4">
              {/* PENDING STATE */}
              {selectedIdea.status === "Pending" && (
                <>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-primary px-6 py-3 rounded-xl font-semibold"
                    >
                      Edit Idea
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 px-6 py-3 rounded-xl font-semibold"
                    >
                      Save Changes
                    </button>
                  )}

                  <button
                    onClick={handleForward}
                    className="bg-blue-500 px-6 py-3 rounded-xl font-semibold"
                  >
                    Forward
                  </button>
                </>
              )}

              {/* ACCEPTED STATE → OPEN KAIZEN */}
              {selectedIdea.status === "Accepted" && (
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setKaizenData({
                      actualBudget:
                        selectedIdea.actual_budget ??
                        selectedIdea.actualBudget ??
                        "",
                      implementationDetails:
                        selectedIdea.implementation_details ??
                        selectedIdea.implementationDetails ??
                        "",
                      implementationImage: null,
                    });

                    setShowKaizenPopup(true);
                  }}
                  className="bg-purple-500 px-6 py-3 rounded-xl font-semibold"
                >
                  Kaizen Details
                </button>
              )}

              {/* ❌ REJECTED STATE → ALLOW EDIT + FORWARD AGAIN */}
              {selectedIdea.status === "Rejected" && (
                <>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-primary px-6 py-3 rounded-xl font-semibold"
                    >
                      Edit Idea
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 px-6 py-3 rounded-xl font-semibold"
                    >
                      Save Changes
                    </button>
                  )}

                  <button
                    onClick={handleForward}
                    className="bg-blue-500 px-6 py-3 rounded-xl font-semibold"
                  >
                    Forward Again
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* KAIZEN POP-UP */}
      {showKaizenPopup && selectedIdea && (
        <div className="flex justify-between items-center mb-8">
          <div
            className="
              glass-strong
              w-[550px]
              rounded-3xl
              p-8
              border border-border
              shadow-2xl
              animation-fade-in"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Kaizen Implementation
                <span className="text-primary">.</span>
              </h2>

              <button
                className="text-red-400 text-2xl hover:scale-125 transition"
                onClick={() => setShowKaizenPopup(false)}
              >
                ✕
              </button>
            </div>

            {/* IDEA */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Idea</p>
              <h3 className="text-xl">{selectedIdea.subject}</h3>
            </div>

            {/* ACTUAL BUDGET */}
            <div>
              <p>Actual Budget</p>
              <input
                type="number"
                value={kaizenData.actualBudget}
                onChange={(e) =>
                  setKaizenData({ ...kaizenData, actualBudget: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-surface border border-border"
              />
            </div>

            {/* IMPLEMENTATION DETAILS */}
            <div className="mb-4">
              <p className="mb-2">Implementation Details</p>

              <textarea
                rows={4}
                value={kaizenData.implementationDetails}
                onChange={(e) =>
                  setKaizenData({
                    ...kaizenData,
                    implementationDetails: e.target.value,
                  })
                }
                className="w-full p-3 rounded-xl bg-surface border border-border"
              />
            </div>

            {/* IMAGE */}
            <div className="mb-6">
              <p className="mb-2">Upload Proof Image</p>

              <input
                type="file"
                onChange={(e) =>
                  setKaizenData({
                    ...kaizenData,
                    implementationImage: e.target.files[0],
                  })
                }
              />

              {/* PREVIEW EXISTING IMAGE */}
              {selectedIdea?.implementation_image && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Uploaded Image</p>

                  <img
                    src={`http://127.0.0.1:8000/uploads/${selectedIdea.implementation_image}`}
                    alt="Kaizen"
                    className="w-500 rounded-xl border"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleKaizenSubmit}
                disabled={!canEditKaizen}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  canEditKaizen
                    ? "bg-primary"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Save Kaizen
              </button>

              <button
                onClick={handleKaizenForward}
                className="bg-blue-500 px-6 py-3 rounded-xl font-semibold"
              >
                Forward Final
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TOTAL */}
        <div className="glass rounded-3xl p-6">
          <h2 className="text-muted-foreground text-sm font-medium">
            Total Ideas
          </h2>

          <p className="text-5xl font-bold mt-5 text-highlight">
            {stats.total}
          </p>
        </div>

        {/* PENDING */}
        <div className="glass rounded-3xl p-6">
          <h2 className="text-muted-foreground text-sm font-medium">Pending</h2>

          <p className="text-5xl font-bold mt-5 text-yellow-400">
            {stats.pending}
          </p>
        </div>

        {/* ACCEPTED */}
        <div className="glass rounded-3xl p-6">
          <h2 className="text-muted-foreground text-sm font-medium">
            Accepted
          </h2>

          <p className="text-5xl font-bold mt-5 text-green-400">
            {stats.accepted}
          </p>
        </div>

        {/* Forwarded */}
        <div className="glass rounded-3xl p-6">
          <h2 className="text-muted-foreground text-sm font-medium">
            Forwarded
          </h2>

          <p className="text-5xl font-bold mt-5 text-red-400">
            {stats.forwarded}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-10 glass rounded-3xl p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("ideas")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              activeTab === "ideas" ? "bg-primary text-white" : "bg-surface"
            }`}
          >
            Submitted Ideas
          </button>

          <button
            onClick={() => setActiveTab("ratings")}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              activeTab === "ratings" ? "bg-primary text-white" : "bg-surface"
            }`}
          >
            Employee Ratings
          </button>
        </div>

        {/* TABLE CONTENT */}
        {activeTab === "ideas" ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-4 text-muted-foreground">S.No</th>
                  <th className="p-4 text-muted-foreground">Idea ID</th>
                  <th className="p-4 text-muted-foreground">Created Date</th>
                  <th className="p-4 text-muted-foreground">Subject</th>
                  <th className="p-4 text-muted-foreground">Employee</th>
                  <th className="p-4 text-muted-foreground">Target Date</th>
                  <th className="p-4 text-muted-foreground">Status</th>
                  <th className="p-4 text-muted-foreground">Kaizen Status</th>
                </tr>
              </thead>

              <tbody>
                {ideas.length > 0 ? (
                  ideas.map((idea, idx) => (
                    <tr
                      key={idea.idea_id}
                      className="border-b hover:bg-surface transition"
                    >
                      <td className="p-4">{idx + 1}</td>

                      <td className="p-4">
                        <button
                          className="text-primary font-semibold hover:underline"
                          onClick={() => {
                            setSelectedIdea(idea);
                            setShowDetails(true);
                          }}
                        >
                          {idea.idea_id}
                        </button>
                      </td>

                      <td className="p-4">
                        {String(idea.created_at).split("T")[0]}
                      </td>

                      <td className="p-4">{idea.subject}</td>

                      <td className="p-4">{idea.emp_name}</td>

                      <td className="p-4">
                        {String(idea.target_date).split("T")[0]}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-medium ${
                            idea.status === "Accepted"
                              ? "bg-green-500/20 text-green-400"
                              : idea.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : idea.status === "Forwarded"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {idea.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-5 py-2 rounded-full text-sm font-medium ${
                            idea.kaizen_status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : idea.kaizen_status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : idea.kaizen_status === "Under Review"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {idea.kaizen_status || "Not Started"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center p-8 text-muted-foreground"
                    >
                      No ideas submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-4 text-muted-foreground">Rank</th>
                  <th className="p-4 text-muted-foreground">Employee Name</th>
                  <th className="p-4 text-muted-foreground">Total Stars</th>
                </tr>
              </thead>

              <tbody>
                {employeeStars.length > 0 ? (
                  employeeStars.map((emp, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-surface transition"
                    >
                      <td className="p-4 font-semibold">#{idx + 1}</td>

                      <td className="p-4">{emp.emp_name}</td>

                      <td className="p-4">
                        <span className="text-yellow-400 font-bold text-lg">
                          ⭐ {emp.total_stars}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center p-8 text-muted-foreground"
                    >
                      No ratings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div
            className="
              glass-strong
              w-[550px]
              rounded-3xl
              p-8
              border border-border
              shadow-2xl
              animation-fade-in
            "
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                New Idea
                <span className="text-primary">.</span>
              </h2>

              <button
                className="text-red-400 text-2xl hover:scale-125 transition"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            {/* SUBJECT */}
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            />
            {errors.subject && (
              <p className="text-red-400 text-sm mb-3">{errors.subject}</p>
            )}

            {/* EMPLOYEE NAME */}
            <input
              type="text"
              placeholder="Employee Name"
              value={formData.empName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  empName: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            />
            {errors.empName && (
              <p className="text-red-400 text-sm mb-3">{errors.empName}</p>
            )}

            {/* CLASSIFICATION */}
            <input
              type="text"
              placeholder="Classification"
              value={formData.classification}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  classification: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            />
            {errors.classification && (
              <p className="text-red-400 text-sm mb-3">
                {errors.classification}
              </p>
            )}

            {/* TARGET DATE */}
            <label className="block mb-2 text-sm">Target Date:</label>

            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetDate: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            />
            {errors.targetDate && (
              <p className="text-red-400 text-sm mb-3">{errors.targetDate}</p>
            )}

            {/* BUDGET */}
            <input
              type="number"
              placeholder="Budget"
              value={formData.budget}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budget: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            />
            {errors.budget && (
              <p className="text-red-400 text-sm mb-3">{errors.budget}</p>
            )}

            {/* DETAILS */}
            <textarea
              placeholder="Idea Details..."
              value={formData.details}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-6 outline-none focus:border-primary"
              rows={5}
            />
            {errors.details && (
              <p className="text-red-400 text-sm mb-3">{errors.details}</p>
            )}

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              className="
                w-full
                bg-primary
                text-primary-foreground
                py-4
                rounded-2xl
                font-semibold
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-lg
              "
            >
              Submit Idea
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee1;
