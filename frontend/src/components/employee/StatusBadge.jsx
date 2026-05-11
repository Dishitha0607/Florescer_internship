function StatusBadge({ status }) {
  return (
    <span
      className={`px-5 py-2 rounded-full text-sm font-medium ${
        status === "Accepted"
          ? "bg-green-500/20 text-green-400"
          : status === "Rejected"
            ? "bg-red-500/20 text-red-400"
            : status === "Forwarded"
              ? "bg-blue-500/20 text-blue-400"
              : "bg-yellow-500/20 text-yellow-400"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;