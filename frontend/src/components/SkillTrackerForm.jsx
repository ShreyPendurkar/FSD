import React, { useState } from "react";

export default function SkillTrackerForm({ addSkill, saving, error }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [checklist, setChecklist] = useState([""]);

  const handleAddChecklistItem = () => setChecklist([...checklist, ""]);
  const handleChecklistChange = (i, val) => {
    const updated = [...checklist];
    updated[i] = val;
    setChecklist(updated);
  };
  const handleRemoveChecklistItem = (i) =>
    setChecklist(checklist.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !goal.trim()) return;

    const checklistLabels = checklist
      .map((item) => item.trim())
      .filter((item) => !!item);

    await addSkill(name.trim(), goal.trim(), checklistLabels);

    setName("");
    setGoal("");
    setChecklist([""]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border dark:border-gray-700 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Add Skill or Hobby Goal
      </h2>
      <input
        type="text"
        placeholder="Skill/Hobby Name (e.g., Guitar, Cooking)"
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={saving}
      />
      <input
        type="text"
        placeholder="Goal (e.g., Practice 20 minutes daily)"
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-3"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
        disabled={saving}
      />
      <div className="mb-4">
        <label className="font-semibold text-gray-900 dark:text-white">
          Checklist Items (optional)
        </label>
        {checklist.map((item, idx) => (
          <div key={idx} className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Checklist step"
              className="flex-grow p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 mb-0"
              value={item}
              onChange={(e) => handleChecklistChange(idx, e.target.value)}
              disabled={saving}
            />
            {checklist.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveChecklistItem(idx)}
                className="text-red-400 hover:text-red-600 px-2"
                disabled={saving}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddChecklistItem}
          className="text-blue-500 text-xs mt-2 hover:underline"
          disabled={saving}
        >
          + Add checklist item
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-4 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-semibold shadow-md transition"
        disabled={saving}
      >
        {saving ? "Adding..." : "Add Skill/Hobby"}
      </button>
      {error && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-center">{error}</p>
      )}
    </form>
  );
}
