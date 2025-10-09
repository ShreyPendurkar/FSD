import React from "react";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "./NoteCard";

export default function NotesList() {
  const { notes, loading, error, deleteNote } = useNotes();

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading notes...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading notes: {error}</div>;
  }

  return (
    <div>
      {notes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No notes found.</p>
      ) : (
        notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))
      )}
    </div>
  );
}
