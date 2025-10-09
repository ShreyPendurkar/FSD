import React, { useState } from "react";

const recurrenceOptions = ["none", "daily", "weekly", "monthly"];

export default function GoalForm({ addGoal, saving, error }) {
  const [title, setTitle] = useState("");
  const [specific, setSpecific] = useState("");
  const [measurable, setMeasurable] = useState("");
  const [achievable, setAchievable] = useState(true);
  const [relevant, setRelevant] = useState(true);
  const [timeBound, setTimeBound] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState("daily");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !specific.trim()) return;
    await addGoal({
      title: title.trim(),
      specific: specific.trim(),
      measurable: measurable.trim(),
      achievable,
      relevant,
      timeBound,
      recurring,
      recurrenceFrequency: recurring ? recurrenceFrequency : null,
    });
    // Reset form
    setTitle("");
    setSpecific("");
    setMeasurable("");
    setAchievable(true);
    setRelevant(true);
    setTimeBound("");
    setRecurring(false);
    setRecurrenceFrequency("daily");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border dark:border-gray-700 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add SMART Goal
        </h2>

        <input
          type="text"
          placeholder="Goal Title"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={saving}
        />

        <input
          type="text"
          placeholder="Specific"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-3"
          value={specific}
          onChange={(e) => setSpecific(e.target.value)}
          required
          disabled={saving}
        />

        <input
          type="text"
          placeholder="Measurable (optional)"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-3"
          value={measurable}
          onChange={(e) => setMeasurable(e.target.value)}
          disabled={saving}
        />

        <div className="flex gap-5 mb-3 text-gray-900 dark:text-white">
          <label>
            <input
              type="checkbox"
              checked={achievable}
              onChange={(e) => setAchievable(e.target.checked)}
              className="mr-2"
              disabled={saving}
            />
            Achievable
          </label>
          <label>
            <input
              type="checkbox"
              checked={relevant}
              onChange={(e) => setRelevant(e.target.checked)}
              className="mr-2"
              disabled={saving}
            />
            Relevant
          </label>
        </div>

        <label className="block mb-2 text-gray-900 dark:text-white">
          Time-bound:
        </label>
        <input
          type="date"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
          value={timeBound}
          onChange={(e) => setTimeBound(e.target.value)}
          disabled={saving}
        />

        <label className="block mb-2 text-gray-900 dark:text-white">
          Recurring:
        </label>
        <div className="flex gap-3 items-center mb-4">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            id="recurring"
            disabled={saving}
          />
          <label htmlFor="recurring" className="text-gray-900 dark:text-white">
            Enable recurring habit
          </label>
        </div>

        {recurring && (
          <select
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mb-4"
            value={recurrenceFrequency}
            onChange={(e) => setRecurrenceFrequency(e.target.value)}
            disabled={saving}
          >
            {recurrenceOptions
              .filter((opt) => opt !== "none")
              .map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
          </select>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-tr from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-md transition"
          disabled={saving}
        >
          {saving ? "Adding..." : "Add Goal"}
        </button>

        {error && (
          <p className="mt-2 text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        )}
      </form>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(12%) sepia(20%) saturate(150%) hue-rotate(0deg) brightness(0.85);
          opacity: 1;
        }
        .dark input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(100%) brightness(2);
          opacity: 1;
        }
      `}</style>
    </>
  );
}
