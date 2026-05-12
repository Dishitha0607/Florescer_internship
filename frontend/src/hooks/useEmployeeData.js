import { useState, useEffect } from "react";
import { fetchIdeasApi, fetchStatsApi, fetchEmployeeStarsApi } from "../api/employeeApi";

export function useEmployeeData() {
  const [ideas, setIdeas] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, forwarded: 0 });
  const [employeeStars, setEmployeeStars] = useState([]);

  const fetchIdeas = async () => {
    try {
      const res = await fetchIdeasApi();
      const data = await res.json();
      setIdeas(Array.isArray(data) ? data : []);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetchStatsApi();
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Stats fetch error:", error);
    }
  };

  const fetchEmployeeStars = async () => {
    try {
      const res = await fetchEmployeeStarsApi();
      const data = await res.json();
      setEmployeeStars(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
    fetchStats();
    fetchEmployeeStars();
  }, []);

  return { ideas, stats, employeeStars, fetchIdeas, fetchStats };
}