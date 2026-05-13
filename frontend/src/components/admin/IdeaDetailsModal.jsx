import { useState } from "react";
import {
  approveIdea,
  rejectIdea,
  approveKaizen,
  rejectKaizen,
} from "../../api/adminApi";

export default function IdeaDetailsModal({ idea, onClose, onRefresh }) {
  const [rating, setRating] = useState(idea.rating || 5);
  const [feedback, setFeedback] = useState(idea.admin_feedback || "");

  const handleAccept = async () => {
    if (!rating) return alert("Please select rating");
    await approveIdea(idea.idea_id, rating, feedback);
    alert("Idea accepted");
    onRefresh();
    onClose();
  };

  const handleReject = async () => {
    if (!feedback.trim()) return alert("Please enter feedback");
    await rejectIdea(idea.idea_id, rating, feedback);
    onRefresh();
    onClose();
  };

  const handleKaizenApprove = async () => {
    await approveKaizen(idea.idea_id);
    alert("Kaizen Approved");
    onRefresh();
    onClose();
  };

  const handleKaizenReject = async () => {
    await rejectKaizen(idea.idea_id);
    alert("Kaizen Rejected");
    onRefresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="glass-strong w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Idea Details</h2>
          <button className="text-red-400 text-2xl" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Fields */}
        {[
          { label: "Idea Id", value: idea.idea_id, highlight: true },
          { label: "Subject", value: idea.subject, highlight: true },
          { label: "Classification", value: idea.classification },
          { label: "Budget", value: `₹ ${idea.budget}` },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="mb-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <h3
              className={`text-lg ${highlight ? "text-xl font-semibold text-primary" : ""}`}
            >
              {value}
            </h3>
          </div>
        ))}

        {/* STATUS - ONLY SMALL SCREEN */}
        <div className="mb-4 md:hidden flex items-center gap-3">
          <p className="text-sm text-muted-foreground">Status :</p>

          <span
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
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
        </div>

        {/* KAIZEN STATUS - SMALL + MEDIUM */}
        <div className="mb-4 lg:hidden flex items-center gap-3">
          <p className="text-sm text-muted-foreground">Kaizen Status :</p>

          <span
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
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
        </div>

        {idea.rating && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Rating</p>
            <h3 className="text-lg">{"⭐".repeat(idea.rating)}</h3>
          </div>
        )}

        {idea.admin_feedback && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Admin Feedback</p>
            <h3 className="text-lg">{idea.admin_feedback}</h3>
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Details</p>
          <h3 className="text-lg">{idea.details}</h3>
        </div>

        {/* Kaizen Details */}
        {idea.implementation_details && (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Actual Budget</p>
              <h3 className="text-lg">₹ {idea.actual_budget}</h3>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Implementation Details
              </p>
              <h3 className="text-lg">{idea.implementation_details}</h3>
            </div>

            {idea.implementation_image && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Implementation Image
                </p>
                <img
                  src={`http://127.0.0.1:8000/uploads/${idea.implementation_image}`}
                  alt="Kaizen"
                  className="rounded-2xl w-full h-60 object-cover"
                />
              </div>
            )}
          </>
        )}

        {/* Kaizen Actions */}
        {idea.kaizen_status === "Under Review" && (
          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold"
              onClick={handleKaizenApprove}
            >
              Approve Kaizen
            </button>
            <button
              className="bg-red-500 px-6 py-3 rounded-xl font-semibold"
              onClick={handleKaizenReject}
            >
              Reject Kaizen
            </button>
          </div>
        )}

        {/* Rating & Feedback */}
        <div className="mb-4 mt-6">
          <p className="text-sm text-muted-foreground mb-2">Rating</p>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 rounded-xl bg-surface border border-border"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {"⭐".repeat(n)} {n}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Admin Feedback</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            placeholder="Enter Admin Feedback"
            className="w-full p-3 rounded-xl bg-surface border border-border"
          />
        </div>

        {/* Accept / Reject */}
        {idea.status === "Forwarded" && (
          <div className="flex gap-4">
            <button
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="bg-red-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
