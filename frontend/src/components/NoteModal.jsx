import React, { useState } from "react";

export default function NoteModal({ date, notes, onSave, onClose }) {
  const [text, setText] = useState(notes);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 w-full max-w-md">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          Notes for {date?.toLocaleDateString()}
        </h2>
        <textarea
          className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 mb-4 focus:outline-none"
          rows={5}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type your notes (e.g. Maths test)…"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700"
            onClick={() => onSave(date, text)}
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
