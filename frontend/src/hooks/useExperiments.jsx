import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function useExperiments() {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage or any other storage you use
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    async function fetchExperiments() {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/experiments`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch experiments");
        const data = await res.json();
        setExperiments(data);
      } catch (err) {
        setError(err.message);
        setExperiments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiments();
  }, [token]);

  async function updateStatus(id, newStatus) {
    if (!["Pending", "Completed"].includes(newStatus)) {
      setError("Invalid status value");
      return;
    }
    try {
      const completedAt = newStatus === "Completed" ? new Date().toISOString() : null;
      const res = await fetch(`${apiUrl}/api/experiments/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, completedAt }),
      });
      if (!res.ok) throw new Error("Failed to update experiment");
      const updatedExperiment = await res.json();
      setExperiments((exps) =>
        exps.map((exp) => (exp._id === id ? updatedExperiment : exp))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function addExperiment(title, description) {
    try {
      const newExperiment = {
        title,
        description,
        status: "Pending",
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      const res = await fetch(`${apiUrl}/api/experiments`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newExperiment),
      });
      if (!res.ok) throw new Error("Failed to add experiment");
      const createdExperiment = await res.json();
      setExperiments((exps) => [createdExperiment, ...exps]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteExperiment(id) {
    try {
      const res = await fetch(`${apiUrl}/api/experiments/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to delete experiment");
      setExperiments((exps) => exps.filter((exp) => exp._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const completedCount = experiments.filter((e) => e.status === "Completed").length;
  const progressPercent = experiments.length
    ? Math.round((completedCount / experiments.length) * 100)
    : 0;

  return {
    experiments,
    loading,
    error,
    updateStatus,
    addExperiment,
    deleteExperiment,
    progressPercent,
  };
}
