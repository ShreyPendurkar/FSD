import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  // Fetch tasks from backend on mount
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const res = await fetch("/api/tasks", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Attach token
          },
        });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [token]);

  // Add new task
  async function addTask(task) {
    try {
      const newTask = {
        status: "Pending",
        createdAt: new Date().toISOString(),
        completedAt: null,
        ...task,
      };
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const createdTask = await res.json();
      setTasks((prev) => [createdTask, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  // Update task
  async function updateTask(id, updatedFields) {
    try {
      if (updatedFields.status === "Completed" && !updatedFields.completedAt) {
        updatedFields.completedAt = new Date().toISOString();
      } else if (updatedFields.status !== "Completed") {
        updatedFields.completedAt = null;
      }

      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Attach token
        },
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Client side filtering
  function filteredTasks(filter = "all") {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.status === "Completed");
      case "pending":
        return tasks.filter((task) => task.status === "Pending");
      case "overdue":
        const today = new Date();
        return tasks.filter(
          (task) => task.status === "Pending" && new Date(task.dueDate) < today
        );
      default:
        return tasks;
    }
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    filteredTasks,
  };
}
