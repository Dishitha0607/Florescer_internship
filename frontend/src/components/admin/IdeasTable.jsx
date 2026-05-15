// import for downloading the TABLE
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

const statusStyle = {
  Accepted: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
  Forwarded: "bg-blue-500/20 text-blue-400",
};

const kaizenStyle = {
  Approved: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
  "Under Review": "bg-yellow-500/20 text-yellow-400 whitespace-nowrap",
};

export default function IdeasTable({ ideas, onSelect }) {
  // Downloading the TABLE
  const handleDownload = () => {
    const excelData = ideas.map((idea, idx) => ({
      "S.No": idx + 1,
      "Idea ID": idea.idea_id,
      Subject: idea.subject,
      Employee: idea.emp_name,
      Classification: idea.classification,
      Budget: idea.budget,
      Status: idea.status,
      "kaizen Status": idea.kaizen_status || "Not Starter",
      "Created Date": String(idea.created_at).split("T")[0],
      "Target Date": String(idea.target_date).split("T")[0],
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Ideas");

    // converts workbook to downloadable data
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // create blob file - turns raw data into downloadable file.
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // triggers the browser download
    saveAs(fileData, "Employee_Ideas.xlsx");
  };

  return (
    <div className="mt-10 glass rounded-3xl p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-medium font-serif">Forwarded Ideas</h2>

        <button
          onClick={handleDownload}
          className="
      bg-green-500
      hover:bg-green-600
      text-white
      p-3
      rounded-xl
      transition
      flex
      items-center
      justify-center
    "
        >
          <Download size={22} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 text-muted-foreground">S.No</th>
              <th className="p-4 text-muted-foreground">Idea ID</th>
              <th className="hidden lg:table-cell p-4 text-muted-foreground">
                Created Date
              </th>
              <th className="hidden md:table-cell p-4 text-muted-foreground">
                Subject
              </th>
              <th className="p-4 text-muted-foreground">Employee</th>
              <th className="hidden lg:table-cell p-4 text-muted-foreground">
                Target Date
              </th>
              <th className="hidden md:table-cell p-4 text-muted-foreground">
                Status
              </th>
              <th className="hidden lg:table-cell p-4 text-muted-foreground">
                Kaizen Status
              </th>
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
                      onClick={() => onSelect(idea)}
                    >
                      {idea.idea_id}
                    </button>
                  </td>

                  <td className="hidden lg:table-cell p-4">
                    {String(idea.created_at).split("T")[0]}
                  </td>
                  <td className="hidden md:table-cell p-4">{idea.subject}</td>
                  <td className="p-4">{idea.emp_name}</td>
                  <td className="hidden lg:table-cell p-4">
                    {String(idea.target_date).split("T")[0]}
                  </td>

                  <td className="hidden md:table-cell p-4">
                    <span
                      className={`px-5 py-2 rounded-full text-sm font-medium ${statusStyle[idea.status] || "bg-yellow-500/20 text-yellow-400"}`}
                    >
                      {idea.status}
                    </span>
                  </td>

                  <td className="hidden lg:table-cell p-4">
                    <span
                      className={`px-5 py-2 rounded-full text-sm font-medium ${kaizenStyle[idea.kaizen_status] || "bg-gray-500/20 text-gray-400"}`}
                    >
                      {idea.kaizen_status || "Not Submitted"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
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
  );
}
