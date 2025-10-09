import React, { useState } from "react";

const categories = ["Documentation", "Tutorial", "Video", "Article", "Other"];

export default function ResourceForm({ addResource, saving, error }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    await addResource({
      title: title.trim(),
      url: url.trim(),
      category,
      description: description.trim(),
    });

    setTitle("");
    setUrl("");
    setCategory(categories[0]);
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border dark:border-gray-700 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Add New Resource
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={saving}
      />
      <input
        type="url"
        placeholder="URL (https://...)"
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        disabled={saving}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
        disabled={saving}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Description (optional)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-y"
        disabled={saving}
      />
      <button
        type="submit"
        className="w-full py-3 mt-4 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold shadow-md transition"
        disabled={saving}
      >
        {saving ? "Adding..." : "Add Resource"}
      </button>
      {error && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-center">{error}</p>
      )}
    </form>
  );
}
