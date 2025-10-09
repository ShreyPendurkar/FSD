import React, { useState, useEffect } from "react";

const nutritionOptions = ["Poor", "Average", "Good", "Excellent"];

export default function HealthLogForm({ addOrUpdateLog, logs, saving, error }) {
  const today = new Date().toISOString().slice(0, 10);
  const existingLog = logs.find((log) => log.date === today);

  const [date, setDate] = useState(today);
  const [sleepHours, setSleepHours] = useState(existingLog?.sleepHours || "");
  const [nutritionQuality, setNutritionQuality] = useState(existingLog?.nutritionQuality || "");
  const [meditationMinutes, setMeditationMinutes] = useState(existingLog?.meditationMinutes || "");
  const [notes, setNotes] = useState(existingLog?.notes || "");

  useEffect(() => {
    if (existingLog) {
      setSleepHours(existingLog.sleepHours || "");
      setNutritionQuality(existingLog.nutritionQuality || "");
      setMeditationMinutes(existingLog.meditationMinutes || "");
      setNotes(existingLog.notes || "");
    }
  }, [existingLog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logsToSubmit = [];

    if (sleepHours !== "") {
      logsToSubmit.push({
        type: "sleep",
        value: sleepHours.toString(),
        date,
      });
    }

    if (nutritionQuality !== "") {
      logsToSubmit.push({
        type: "nutrition",
        value: nutritionQuality,
        date,
      });
    }

    if (meditationMinutes !== "") {
      logsToSubmit.push({
        type: "meditation",
        value: meditationMinutes.toString(),
        date,
      });
    }

    try {
      for (const log of logsToSubmit) {
        await addOrUpdateLog(log);
      }
    } catch (err) {
      // Error handled inside addOrUpdateLog
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border dark:border-gray-700 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Daily Health Log</h2>

      <label className="block mb-1 text-gray-700 dark:text-gray-300">Date</label>
      <input
        type="date"
        className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        max={today}
        disabled={saving}
      />

      <label className="block mb-1 text-gray-700 dark:text-gray-300">Sleep Hours</label>
      <input
        type="number"
        min="0"
        max="24"
        step="0.1"
        value={sleepHours}
        onChange={(e) => setSleepHours(e.target.value)}
        className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        placeholder="e.g., 7.5"
        disabled={saving}
      />

      <label className="block mb-1 text-gray-700 dark:text-gray-300">Nutrition Quality</label>
      <select
        className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        value={nutritionQuality}
        onChange={(e) => setNutritionQuality(e.target.value)}
        disabled={saving}
      >
        <option value="">Select...</option>
        {nutritionOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <label className="block mb-1 text-gray-700 dark:text-gray-300">Meditation Minutes</label>
      <input
        type="number"
        min="0"
        value={meditationMinutes}
        onChange={(e) => setMeditationMinutes(e.target.value)}
        className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        placeholder="e.g., 15"
        disabled={saving}
      />

      <label className="block mb-1 text-gray-700 dark:text-gray-300">Notes (optional)</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows="3"
        className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        placeholder="How do you feel today?"
        disabled={saving}
      />

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-tr from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-md transition"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Log"}
      </button>

      {error && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </form>
  );
}
