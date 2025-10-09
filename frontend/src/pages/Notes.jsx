import React from 'react';
import MainLayout from '../components/MainLayout';
import NoteEditor from '../components/NoteEditor';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../hooks/useNotes';

export default function Notes() {
  const { notes, loading, error, addNote, deleteNote } = useNotes();

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center p-10 text-gray-600 dark:text-gray-400">Loading notes...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center p-10 text-red-600 dark:text-red-400">Error loading notes: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Notes & Code Snippets
      </h1>
      <NoteEditor experimentId={null} addNote={addNote} />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No notes added yet.
          </p>
        ) : (
          notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={deleteNote} />
          ))
        )}
      </div>
    </MainLayout>
  );
}
