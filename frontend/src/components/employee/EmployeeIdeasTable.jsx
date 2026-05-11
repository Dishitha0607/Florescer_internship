import StatusBadge from "./StatusBadge";
import KaizenBadge from "./KaizenBadge";

function EmployeeIdeasTable({ ideas, onSelectIdea }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4">S.No</th>
            <th className="p-4">Idea ID</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Employee</th>
            <th className="p-4">Status</th>
            <th className="p-4">Kaizen</th>
          </tr>
        </thead>

        <tbody>
          {ideas.map((idea, idx) => (
            <tr key={idea.idea_id}>
              <td className="p-4">{idx + 1}</td>

              <td className="p-4">
                <button
                  onClick={() => onSelectIdea(idea)}
                  className="text-primary hover:underline"
                >
                  {idea.idea_id}
                </button>
              </td>

              <td className="p-4">{idea.subject}</td>

              <td className="p-4">{idea.emp_name}</td>

              <td className="p-4">
                <StatusBadge status={idea.status} />
              </td>

              <td className="p-4">
                <KaizenBadge status={idea.kaizen_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeIdeasTable;