function StatCard({ label, value }) {
  return (
    <div className="glass rounded-3xl p-6">
      <h2 className="text-muted-foreground text-sm font-medium">{label}</h2>
      <p className="text-5xl font-bold mt-5 text-highlight">{value}</p>
    </div>
  );
}

export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Ideas" value={stats.total} />
      <StatCard label="Pending" value={stats.pending} />
      <StatCard label="Accepted" value={stats.accepted} />
      <StatCard label="Rejected" value={stats.rejected} />
    </div>
  );
}