import { useState, useEffect } from "react";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  // Fetch all notes on mount
  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      try {
        const res = await fetch("/api/notes", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Attach token here
          },
        });
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [token]);

  // Add new note
  async function addNote(newNote) {
    try {
      const noteToCreate = {
        ...newNote,
        createdAt: new Date().toISOString(),
      };
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Attach token here
        },
        body: JSON.stringify(noteToCreate),
      });
      if (!res.ok) throw new Error("Failed to add note");
      const createdNote = await res.json();
      setNotes((nds) => [createdNote, ...nds]);
    } catch (err) {
      setError(err.message);
    }
  }

  // Update a note by ID
  async function updateNote(id, updatedFields) {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Attach token here
        },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Failed to update note");
      const updatedNote = await res.json();
      setNotes((nds) =>
        nds.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a note by ID
  async function deleteNote(id) {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,  // Attach token here
        },
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes((nds) => nds.filter((note) => note._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Get notes filtered by experimentId (client-side filtering)
  function getNotesByExperiment(experimentId) {
    return notes.filter(
      (note) => String(note.experimentId) === String(experimentId)
    );
  }

  return {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    getNotesByExperiment,
  };
}
