{/* SUMMARY */}

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass rounded-3xl p-6">
        <h2 className="text-muted-foreground text-sm font-medium">
          Total Ideas
        </h2>

        <p className="text-5xl font-bold mt-5 text-highlight">
          {stats.total}
        </p>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2 className="text-muted-foreground text-sm font-medium">
          Pending
        </h2>

        <p className="text-5xl font-bold mt-5 text-highlight">
          {stats.pending}
        </p>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2 className="text-muted-foreground text-sm font-medium">
          Accepted
        </h2>

        <p className="text-5xl font-bold mt-5 text-highlight">
          {stats.accepted}
        </p>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2 className="text-muted-foreground text-sm font-medium">
          Rejected
        </h2>

        <p className="text-5xl font-bold mt-5 text-highlight">
          {stats.rejected}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;