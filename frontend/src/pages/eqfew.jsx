// import for downloading the TABLE
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

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
    bookType: "xlxs",
    type: "array",
  });

  // create blob file - turns raw data into downloadable file.
  const fileData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // triggers the browser download
  saveAs(fileData, "Employee_Ideas.xlsx");
};

<div className="mt-10 glass rounded-3xl p-6">
  <div className="flex gap-4 mb-6"></div>
</div>;
