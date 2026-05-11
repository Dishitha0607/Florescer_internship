function EmployeeStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass rounded-3xl p-6">
        <h2>Total Ideas</h2>

        <p className="text-5xl font-bold mt-5">
          {stats.total}
        </p>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2>Pending</h2>

        <p className="text-5xl font-bold mt-5 text-yellow-400">
          {stats.pending}
        </p>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2>Accepted</h2>

        <p className="text-5xl font-bold mt-5 text-green-400">
          {stats.accepted}
        </p>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2>Forwarded</h2>

        <p className="text-5xl font-bold mt-5 text-blue-400">
          {stats.forwarded}
        </p>
      </div>
    </div>
  );
}

export default EmployeeStats;