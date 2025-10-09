import { useState, useEffect } from "react";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  // Fetch skills on mount
  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      try {
        const res = await fetch("/api/skills", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // attach token here
          },
        });
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        setError(err.message);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, [token]);

  // Add a new skill
  async function addSkill(name, goal, checklistLabels = []) {
    try {
      const newSkill = {
        name,
        goal,
        streak: 0,
        lastPracticed: null,
        checklist: checklistLabels.map(label => ({ label, checked: false })),
        createdAt: new Date().toISOString(),
      };
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // attach token here
        },
        body: JSON.stringify(newSkill),
      });
      if (!res.ok) throw new Error("Failed to add skill");
      const createdSkill = await res.json();
      setSkills(prev => [createdSkill, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  // Other methods similarly updated with token...

  async function markPracticed(id) {
    // ...
    const res = await fetch(`/api/skills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // attach token here
      },
      body: JSON.stringify({ lastPracticed: getToday(), streak: newStreak }),
    });
    // ...
  }

  async function updateChecklist(id, idx, checked) {
    // ...
    const res = await fetch(`/api/skills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // attach token here
      },
      body: JSON.stringify({ checklist: updatedChecklist }),
    });
    // ...
  }

  async function resetChecklist(id) {
    // ...
    const res = await fetch(`/api/skills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // attach token here
      },
      body: JSON.stringify({ checklist: resetChecklist }),
    });
    // ...
  }

  async function removeSkill(id) {
    const res = await fetch(`/api/skills/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,  // attach token here
      },
    });
    // ...
  }

  return {
    skills,
    loading,
    error,
    addSkill,
    markPracticed,
    updateChecklist,
    resetChecklist,
    removeSkill,
  };
}
