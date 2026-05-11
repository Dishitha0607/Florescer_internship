function IdeaDetailsModal({
  selectedIdea,
  editMode,
  setEditMode,
  setSelectedIdea,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="glass-strong w-[650px] rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2>Idea Details</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p>Subject</p>

          {editMode ? (
            <input
              value={selectedIdea.subject}
              onChange={(e) =>
                setSelectedIdea({
                  ...selectedIdea,
                  subject: e.target.value,
                })
              }
            />
          ) : (
            <h3>{selectedIdea.subject}</h3>
          )}
        </div>

      </div>
    </div>
  );
}

export default IdeaDetailsModal;