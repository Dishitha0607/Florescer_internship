function EmployeeRatingsTable({ employeeStars }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4">Rank</th>
            <th className="p-4">Employee Name</th>
            <th className="p-4">Stars</th>
          </tr>
        </thead>

        <tbody>
          {employeeStars.map((emp, idx) => (
            <tr key={idx}>
              <td className="p-4">#{idx + 1}</td>

              <td className="p-4">{emp.emp_name}</td>

              <td className="p-4">
                ⭐ {emp.total_stars}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeRatingsTable;