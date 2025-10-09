import React, { useState } from 'react';

export default function NoteEditor({ experimentId, addNote, saving, error }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('text'); // 'note' or 'code'
  const [language, setLanguage] = useState('javascript'); // for code snippets

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await addNote({
      experimentId,
      title: title.trim(),
      content: content.trim(),
      type,
      language: type === 'code' ? language : undefined,
    });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-5 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
      <div className="mb-3 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Title"
          className="flex-grow p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={saving}
        />
        <select
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={saving}
        >
          <option value="text">Note</option>
          <option value="code">Code Snippet</option>
        </select>
        {type === 'code' && (
          <select
            className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={saving}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            {/* Add more languages as needed */}
          </select>
        )}
      </div>
      <textarea
        rows={6}
        placeholder={type === 'code' ? 'Paste your code snippet here...' : 'Write your note here...'}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-y"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        disabled={saving}
      />
      <button
        type="submit"
        className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition"
        disabled={saving}
      >
        Add {type === 'code' ? 'Code Snippet' : 'Note'}
      </button>
      {error && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-center">{error}</p>
      )}
    </form>
  );
}
