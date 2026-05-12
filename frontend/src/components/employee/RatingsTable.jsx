export default function RatingsTable({ employeeStars }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4 text-muted-foreground">Rank</th>
            <th className="p-4 text-muted-foreground">Employee Name</th>
            <th className="p-4 text-muted-foreground">Total Stars</th>
          </tr>
        </thead>

        <tbody>
          {employeeStars.length > 0 ? (
            employeeStars.map((emp, idx) => (
              <tr key={idx} className="border-b hover:bg-surface transition">
                <td className="p-4 font-semibold">#{idx + 1}</td>
                <td className="p-4">{emp.emp_name}</td>
                <td className="p-4">
                  <span className="text-yellow-400 font-bold text-lg">
                    ⭐ {emp.total_stars}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-8 text-muted-foreground">
                No ratings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}