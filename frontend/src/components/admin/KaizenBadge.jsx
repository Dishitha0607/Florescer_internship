function KaizenBadge({ status }) {
  return (
    <span
      className={`px-5 py-2 rounded-full text-sm font-medium ${
        status === "Approved"
          ? "bg-green-500/20 text-green-400"
          : status === "Rejected"
            ? "bg-red-500/20 text-red-400"
            : status === "Under Review"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-gray-500/20 text-gray-400"
      }`}
    >
      {status || "Not Submitted"}
    </span>
  );
}

export default KaizenBadge;