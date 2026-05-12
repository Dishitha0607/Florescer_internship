import { useState, useEffect } from "react";

export function useAdminData() {
  const [ideas, setIdeas] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const fetchIdeas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/adminIdeas");
      const data = await res.json();
      setIdeas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Ideas Error:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboardStats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Stats Error:", error);
    }
  };

  useEffect(() => {
    fetchIdeas();
    fetchStats();
  }, []);

  return { ideas, stats, fetchIdeas, fetchStats };
}