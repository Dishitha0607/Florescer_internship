import { useEffect, useState } from "react";
import Logout from "../components/Logout";

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

  // =========================
  // FETCH FORWARDED IDEAS
  // =========================
  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/adminIdeas");
      const data = await res.json();
      console.log(data);
      setIdeas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Ideas Error:", error);
    }
  };

  // =========================
  // FETCH STATS
  // =========================
  const fetchStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboardStats");
      const data = await res.json();

      setStats(data);
    } catch (error) {
      console.error("Stats Error:", error);
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchIdeas();
    fetchStats();
  }, []);

  // =========================
  // ACCEPT IDEA
  // =========================
  const handleAccept = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/approveIdea/${selectedIdea.idea_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: Number(rating),
            feedback: feedback,
          }),
        },
      );
      const data = await res.json();
      console.log(data);

      fetchIdeas();
      fetchStats();

      setShowDetails(false);
      setSelectedIdea(null);

      setRating(5);
      setFeedback("");

      alert("Idea accepted");
    } catch (error) {
      console.error("Accept Error:", error);
    }
  };

  // =========================
  // REJECT IDEA
  // =========================
  const handleReject = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/rejectIdea/${selectedIdea.idea_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: Number(rating),
            feedback: feedback,
          }),
        },
      );
      const data = await res.json();
      console.log(data);

      fetchIdeas();
      fetchStats();

      setShowDetails(false);
      setSelectedIdea(null);

      setFeedback("");
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold  leading-tight font-serif">
            Admin <span className="text-primary italic">Dashboard</span>
          </h2>
          <Logout />
        </div>

        {/* SUMMARY */}
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

          {/* PEDING */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-muted-foreground text-sm font-medium">
              Pending
            </h2>
            <p className="text-5xl font-bold mt-5 text-highlight">
              {stats.pending}
            </p>
          </div>

          {/* ACCEPTED */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-muted-foreground text-sm font-medium">
              Accepted
            </h2>
            <p className="text-5xl font-bold mt-5 text-highlight">
              {stats.accepted}
            </p>
          </div>

          {/* REJECTED */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-muted-foreground text-sm font-medium">
              Rejected
            </h2>
            <p className="text-5xl font-bold mt-5 text-highlight">
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-10 glass rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium font-serif">Forwarded Ideas</h2>
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

                            setRating(idea.rating || 5);
                            setFeedback(idea.admin_feedback || "");

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

        {/* DEATILS POP-UP */}
        {showDetails && selectedIdea && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
            <div className="glass-strong w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl p-8">
              {/* HEADER */}
              <div className="flex justify-between itrms-center mb-6">
                <h2>Idea Details</h2>
                <button
                  className="text-red-400 text-2xl"
                  onClick={() => {
                    setShowDetails(false);
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
                <h3 className="text-xl font-semibold text-primary">
                  {selectedIdea.subject}
                </h3>
              </div>

              {/* Classification */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Classification</p>
                <h3>{selectedIdea.classification}</h3>
              </div>

              {/* Budget */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Budget</p>

                <h3 className="text-lg">₹ {selectedIdea.budget}</h3>
              </div>

              {/* Rating-pop-up */}
              {selectedIdea.rating && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Rating</p>

                  <h3 className="text-lg">
                    {"⭐".repeat(selectedIdea.rating)}
                  </h3>
                </div>
              )}

              {/* Admin Feedback */}
              {selectedIdea.admin_feedback && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Admin Feedback
                  </p>

                  <h3 className="text-lg">{selectedIdea.admin_feedback}</h3>
                </div>
              )}

              {/* Details */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">Details</p>

                <h3 className="text-lg">{selectedIdea.details}</h3>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Rating</p>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full p-3 rounded-xl bg-surface border border-border"
                >
                  <option value="1">⭐ 1</option>
                  <option value="2">⭐ 2</option>
                  <option value="3">⭐ 3</option>
                  <option value="4">⭐ 4</option>
                  <option value="5">⭐ 5</option>
                </select>
              </div>

              {/* Admin Feedback */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Admin Feedback
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  placeholder="Enter Admin Feedback"
                  className="w-full p-3 rounded-xl bg-surface border border-border"
                />
              </div>

              {/* Buttons */}
              {selectedIdea.status === "Forwarded" && (
                <div className="flex gap-4">
                  <button
                    className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                    onClick={() => {
                      if (!rating) {
                        alert("Please select rating");
                        return;
                      }
                      handleAccept();
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                    onClick={() => {
                      if (!feedback.trim()) {
                        alert("Please enter feedback");
                        return;
                      }
                      handleReject();
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
