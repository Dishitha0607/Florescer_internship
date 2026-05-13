export default function IdeaDetailsModal({
  showDetails,
  setShowDetails,
  selectedIdea,
  setSelectedIdea,
  editMode,
  setEditMode,
  handleUpdate,
  handleForward,
  setShowKaizenPopup,
  setKaizenData,
}) {
  return (
    <>
      {showDetails && selectedIdea && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="glass-strong w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Idea Details</h2>
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

            {/* STATUS */}
            <div className="mb-4 md:hidden flex items-center gap-3">
              <p className="text-sm text-muted-foreground">Status </p>
              <span
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  selectedIdea.status === "Accepted"
                    ? "bg-green-500/20 text-green-400"
                    : selectedIdea.status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : selectedIdea.status === "Forwarded"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {selectedIdea.status}
              </span>
            </div>

            {/* KAIZEN STATUS */}
            <div className="mb-4 lg:hidden flex items-center gap-3">
              <p className="text-sm text-muted-foreground">Kaizen Status</p>
              <span
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedIdea.kaizen_status === "Approved"
                    ? "bg-green-500/20 text-green-400"
                    : selectedIdea.kaizen_status === "Rejected"
                      ? "bg-red-500/20 text-red-400"
                      : selectedIdea.kaizen_status === "Under Review"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {selectedIdea.kaizen_status || "Not Started"}
              </span>
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

              {/* ACCEPTED STATE */}
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

              {/* REJECTED STATE */}
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
    </>
  );
}
