const statusStyle = {
  Accepted: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
  Forwarded: "bg-blue-500/20 text-blue-400",
};

const kaizenStyle = {
  Approved: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
  "Under Review": "bg-yellow-500/20 text-yellow-400",
};

export default function IdeasTable({ ideas, onSelect }) {
  return (
    <div className="mt-10 glass rounded-3xl p-6">
      <h2 className="text-2xl font-medium font-serif mb-6">Forwarded Ideas</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              {["S.No", "Idea ID", "Created Date", "Subject", "Employee", "Target Date", "Status", "Kaizen Status"].map(
                (col) => (
                  <th key={col} className="p-4 text-muted-foreground">{col}</th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {ideas.length > 0 ? (
              ideas.map((idea, idx) => (
                <tr key={idea.idea_id} className="border-b hover:bg-surface transition">
                  <td className="p-4">{idx + 1}</td>

                  <td className="p-4">
                    <button
                      className="text-primary font-semibold hover:underline"
                      onClick={() => onSelect(idea)}
                    >
                      {idea.idea_id}
                    </button>
                  </td>

                  <td className="p-4">{String(idea.created_at).split("T")[0]}</td>
                  <td className="p-4">{idea.subject}</td>
                  <td className="p-4">{idea.emp_name}</td>
                  <td className="p-4">{String(idea.target_date).split("T")[0]}</td>

                  <td className="p-4">
                    <span className={`px-5 py-2 rounded-full text-sm font-medium ${statusStyle[idea.status] || "bg-yellow-500/20 text-yellow-400"}`}>
                      {idea.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-5 py-2 rounded-full text-sm font-medium ${kaizenStyle[idea.kaizen_status] || "bg-gray-500/20 text-gray-400"}`}>
                      {idea.kaizen_status || "Not Submitted"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-8 text-muted-foreground">
                  No ideas submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}