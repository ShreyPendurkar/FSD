import React from 'react';

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{note.title}</h3>
      {note.type === "code" ? (
        <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto font-mono text-sm text-gray-900 dark:text-green-400 whitespace-pre-wrap">
          {note.content}
        </pre>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
      )}
      <button
        onClick={() => onDelete(note._id)}
        className="mt-3 px-3 py-1 text-xs font-semibold text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );
}
