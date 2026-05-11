function IdeaDetailsModal({
  selectedIdea,
  rating,
  feedback,
  setRating,
  setFeedback,
  onClose,
  onAccept,
  onReject,
  onKaizenApprove,
  onKaizenReject,
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="glass-strong w-[650px] max-h-[90vh] overflow-y-auto rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Idea Details</h2>

          <button className="text-red-400 text-2xl" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* SUBJECT */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Subject</p>

          <h3 className="text-xl font-semibold text-primary">
            {selectedIdea.subject}
          </h3>
        </div>

        {/* DETAILS */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Details</p>

          <h3>{selectedIdea.details}</h3>
        </div>

        {/* KAIZEN BUTTONS */}
        {selectedIdea.kaizen_status === "Under Review" && (
          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold"
              onClick={onKaizenApprove}
            >
              Approve Kaizen
            </button>

            <button
              className="bg-red-500 px-6 py-3 rounded-xl font-semibold"
              onClick={onKaizenReject}
            >
              Reject Kaizen
            </button>
          </div>
        )}

        {/* RATING */}
        <div className="mb-4 mt-6">
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

        {/* FEEDBACK */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            Admin Feedback
          </p>

          <textarea
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter Feedback"
            className="w-full p-3 rounded-xl bg-surface border border-border"
          />
        </div>

        {/* ACTION BUTTONS */}
        {selectedIdea.status === "Forwarded" && (
          <div className="flex gap-4">
            <button
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold"
              onClick={onAccept}
            >
              Accept
            </button>

            <button
              className="bg-red-500 px-6 py-3 rounded-xl font-semibold"
              onClick={onReject}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdeaDetailsModal;