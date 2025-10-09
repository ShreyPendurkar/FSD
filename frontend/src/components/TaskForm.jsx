import React, { useState } from "react";

export default function TaskForm({ addTask, saving, error }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    await addTask({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border dark:border-gray-700 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Add New Task
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Task Title"
          className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={saving}
        />
        <input
          type="date"
          className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          disabled={saving}
        />
      </div>
      <textarea
        placeholder="Description (optional)"
        rows={3}
        className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-y"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={saving}
      />
      <div className="mb-4">
        <label className="mr-4 font-semibold text-gray-900 dark:text-white">
          Priority:
        </label>
        <select
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={saving}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold shadow-md transition"
        disabled={saving}
      >
        {saving ? "Adding..." : "Add Task"}
      </button>
      {error && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-center">{error}</p>
      )}
    </form>
  );
}
