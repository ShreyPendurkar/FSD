import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

// Helper to get today's date string YYYY-MM-DD
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  // Fetch goals on mount
  useEffect(() => {
    async function fetchGoals() {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/goals`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch goals");
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        setError(err.message);
        setGoals([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGoals();
  }, [token]);

  // Add new goal
  async function addGoal(goal) {
    try {
      const newGoal = {
        ...goal,
        history: [],
        completed: false,
        createdAt: new Date().toISOString()
      };
      const res = await fetch(`${apiUrl}/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newGoal),
      });
      if (!res.ok) throw new Error("Failed to add goal");
      const createdGoal = await res.json();
      setGoals((prev) => [createdGoal, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  // Toggle completed state
  async function toggleCompletion(id) {
    try {
      const goal = goals.find((g) => g._id === id);
      if (!goal) throw new Error("Goal not found");
      const updatedGoal = {
        ...goal,
        completed: !goal.completed,
      };
      const res = await fetch(`${apiUrl}/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: updatedGoal.completed }),
      });
      if (!res.ok) throw new Error("Failed to update completion");
      const returnedGoal = await res.json();
      setGoals((prev) =>
        prev.map((g) => (g._id === id ? returnedGoal : g))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Add habit history date
  async function addHabitHistory(id, date = getToday()) {
    try {
      const goal = goals.find((g) => g._id === id);
      if (!goal) throw new Error("Goal not found");
      if (goal.history.includes(date)) return;

      const updatedHistory = [...goal.history, date];
      const res = await fetch(`${apiUrl}/api/goals/${id}/history`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ history: updatedHistory }),
      });
      if (!res.ok) throw new Error("Failed to update history");
      const updatedGoal = await res.json();
      setGoals((prev) =>
        prev.map((g) => (g._id === id ? updatedGoal : g))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Remove habit history date
  async function removeHabitHistory(id, date) {
    try {
      const goal = goals.find((g) => g._id === id);
      if (!goal) throw new Error("Goal not found");

      const updatedHistory = goal.history.filter((d) => d !== date);
      const res = await fetch(`${apiUrl}/api/goals/${id}/history`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ history: updatedHistory }),
      });
      if (!res.ok) throw new Error("Failed to update history");
      const updatedGoal = await res.json();
      setGoals((prev) =>
        prev.map((g) => (g._id === id ? updatedGoal : g))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Update a goal partially
  async function updateGoal(id, updatedFields) {
    try {
      const res = await fetch(`${apiUrl}/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Failed to update goal");
      const updatedGoal = await res.json();
      setGoals((prev) =>
        prev.map((g) => (g._id === id ? updatedGoal : g))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a goal
  async function deleteGoal(id) {
    try {
      const res = await fetch(`${apiUrl}/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete goal");
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return {
    goals,
    loading,
    error,
    addGoal,
    toggleCompletion,
    addHabitHistory,
    removeHabitHistory,
    updateGoal,
    deleteGoal,
  };
}
