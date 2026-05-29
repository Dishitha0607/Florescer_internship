export default function NewIdeaModal({
  showForm,
  setShowForm,
  formData,
  setFormData,
  errors,
  handleSubmit,
}) {
  return (
    <>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="glass-strong w-[550px] rounded-3xl p-8 border border-border shadow-2xl animation-fade-in">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                New Idea<span className="text-primary">.</span>
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
                setFormData({ ...formData, subject: e.target.value })
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
                setFormData({ ...formData, empName: e.target.value })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            />
            {errors.empName && (
              <p className="text-red-400 text-sm mb-3">{errors.empName}</p>
            )}

            {/* CLASSIFICATION */}
            {/* CLASSIFICATION */}
            <select
              value={formData.classification}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  classification: e.target.value,
                })
              }
              className="w-full bg-surface border border-border rounded-2xl p-4 mb-4 outline-none focus:border-primary"
            >
              <option value="">Select Classification</option>

              <option value="Safety">Safety</option>
              <option value="Cost Saving">Cost Saving</option>
              <option value="Quality Improvement">Quality Improvement</option>
              <option value="Productivity">Productivity</option>
              <option value="Process Improvement">Process Improvement</option>
              <option value="Automation">Automation</option>
              <option value="Energy Saving">Energy Saving</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Innovation">Innovation</option>
              <option value="Customer Experience">Customer Experience</option>
            </select>

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
                setFormData({ ...formData, targetDate: e.target.value })
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
                setFormData({ ...formData, budget: e.target.value })
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
                setFormData({ ...formData, details: e.target.value })
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
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Submit Idea
            </button>
          </div>
        </div>
      )}
    </>
  );
}
