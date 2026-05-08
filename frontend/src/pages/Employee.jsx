import { useEffect, useState } from "react";
import Button from "../components/Button";
import Logout from "../components/Logout";

function Employee() {
  const [showForm, setShowForm] = useState(false);

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

  // FETCH IDEAS
  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ideas?email=emp@test.com");

      const data = await res.json();
      // consoling
      console.log(data);

      setIdeas(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      console.error("Error fetching ideas:", error);
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
      console.error("Stats fetch error:", error);
    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchIdeas();
    fetchStats();
  }, []);

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    // VALIDATION
    if (
      !formData.subject ||
      !formData.empName ||
      !formData.classification ||
      !formData.targetDate ||
      !formData.budget ||
      !formData.details
    ) {
      alert("Please fill all fields");
      return;
    }

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

      // RELOAD TABLE + STATS
      fetchIdeas();
      fetchStats();

      // CLEAR FORM
      setFormData({
        classification: "",
        budget: "",
        subject: "",
        details: "",
        targetDate: "",
        employeeEmail: "emp@test.com",
        empName: "",
      });

      // CLOSE MODAL
      setShowForm(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // Handling Update
  const handleUpdate = async () => {
    try {
      const payload = {
        classification: selectedIdea.classification,
        budget: parseFloat(selectedIdea.budget),
        subject: selectedIdea.subject,
        details: selectedIdea.details,
        targetDate: selectedIdea.target_date,
        empName: selectedIdea.emp_name,
      };

      console.log(payload);

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

      console.log(data);

      fetchIdeas();

      setSelectedIdea(null);
      setEditMode(false);
      setShowDetails(false);

      alert("Idea updated successfully");
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

  return (
    <div className="min-h-screen p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif">
            Employee <span className="text-primary italic">Dashboard</span>
          </h2>
          
        </div>

        <Logout />
        <Button
          onClick={() => setShowForm(true)}
          className="animation-fade-in animation-delay-200"
        >
          + New Idea
        </Button>
      </div>

      {/* Details pop-up when u click on the idea_id */}
      {showDetails && selectedIdea && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="glass-strong w-[650px] rounded-3xl p-8">
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

            {/* Button */}
            <div className="flex gap-4">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium font-serif">Submitted Ideas</h2>
        </div>

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
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-8 text-muted-foreground"
                  >
                    No ideas submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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

export default Employee;
