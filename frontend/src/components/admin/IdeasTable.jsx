import StatusBadge from "./StatusBadge";
import KaizenBadge from "./KaizenBadge";

function IdeasTable({ ideas, onSelectIdea }) {
  return (
    <div className="mt-10 glass rounded-3xl p-6">
      <h2 className="text-2xl font-medium font-serif mb-6">
        Forwarded Ideas
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4">S.No</th>
              <th className="p-4">Idea ID</th>
              <th className="p-4">Created Date</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Employee</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Kaizen Status</th>
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
                      onClick={() => onSelectIdea(idea)}
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
                    <StatusBadge status={idea.status} />
                  </td>

                  <td className="p-4">
                    <KaizenBadge status={idea.kaizen_status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-8">
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

export default IdeasTable;