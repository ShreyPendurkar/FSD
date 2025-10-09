import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function useHealth() {
  const [logs, setLogs] = useState([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/health`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!res.ok) throw new Error("Failed to fetch health logs");
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [token]);

  async function addOrUpdateLog(log) {
    try {
      const isoDate = new Date(log.date).toISOString();

     const url = `${apiUrl}/api/health/`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: log.type,
          value: log.value,
          date: isoDate,
        }),
      });
      if (!res.ok) throw new Error("Failed to save health log");
      const savedLog = await res.json();

      setLogs((prev) => {
        const dateCmp = new Date(savedLog.date).toISOString();
        const filtered = prev.filter(
          (l) =>
            !(
              l.type === savedLog.type &&
              new Date(l.date).toISOString() === dateCmp
            )
        );
        return [savedLog, ...filtered];
      });
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete all health logs for a given date (grouped log)
  async function deleteLogsForDate(date) {
    try {
      // Find all logs for the given date (ignore time part)
      const logsToDelete = logs.filter(
        (log) => new Date(log.date).toISOString().slice(0, 10) === date
      );
      for (const log of logsToDelete) {
        await fetch(`/api/health/${log._id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      }
      setLogs(prev => prev.filter(
        (log) => new Date(log.date).toISOString().slice(0, 10) !== date
      ));
    } catch (err) {
      setError(err.message);
    }
  }

  function toggleVisibility() {
    setVisible((v) => !v);
  }

  function groupLogsByDate(logs) {
    const grouped = {};

    logs.forEach(({ _id, date, type, value }) => {
      const dateKey = new Date(date).toISOString().slice(0, 10);
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          _ids: [],
          date: dateKey,
          sleepHours: "",
          nutritionQuality: "",
          meditationMinutes: "",
        };
      }
      grouped[dateKey]._ids.push(_id);
      if (type === "sleep") grouped[dateKey].sleepHours = value;
      else if (type === "nutrition") grouped[dateKey].nutritionQuality = value;
      else if (type === "meditation") grouped[dateKey].meditationMinutes = value;
    });

    return Object.values(grouped);
  }

  const groupedLogs = groupLogsByDate(logs);

  return {
    logs,
    groupedLogs,
    visible,
    loading,
    error,
    addOrUpdateLog,
    deleteLogsForDate,
    toggleVisibility,
  };
}
