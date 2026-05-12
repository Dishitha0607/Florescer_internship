export default function KaizenModal({
  showKaizenPopup,
  setShowKaizenPopup,
  selectedIdea,
  kaizenData,
  setKaizenData,
  canEditKaizen,
  handleKaizenSubmit,
  handleKaizenForward,
}) {
  return (
    <>
      {showKaizenPopup && selectedIdea && (
        <div className="flex justify-between items-center mb-8">
          <div className="glass-strong w-[550px] rounded-3xl p-8 border border-border shadow-2xl animation-fade-in">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Kaizen Implementation<span className="text-primary">.</span>
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
                onChange={(e) => setKaizenData({ ...kaizenData, actualBudget: e.target.value })}
                className="w-full p-3 rounded-xl bg-surface border border-border"
              />
            </div>

            {/* IMPLEMENTATION DETAILS */}
            <div className="mb-4">
              <p className="mb-2">Implementation Details</p>
              <textarea
                rows={4}
                value={kaizenData.implementationDetails}
                onChange={(e) => setKaizenData({ ...kaizenData, implementationDetails: e.target.value })}
                className="w-full p-3 rounded-xl bg-surface border border-border"
              />
            </div>

            {/* IMAGE */}
            <div className="mb-6">
              <p className="mb-2">Upload Proof Image</p>
              <input
                type="file"
                onChange={(e) => setKaizenData({ ...kaizenData, implementationImage: e.target.files[0] })}
              />
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
                className={`px-6 py-3 rounded-xl font-semibold ${canEditKaizen ? "bg-primary" : "bg-gray-500 cursor-not-allowed"}`}
              >
                Save Kaizen
              </button>
              <button onClick={handleKaizenForward} className="bg-blue-500 px-6 py-3 rounded-xl font-semibold">
                Forward Final
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}