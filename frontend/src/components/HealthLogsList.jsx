import React from "react";

export default function HealthLogsList({ logs, deleteLogsForDate }) {
  if (!logs || logs.length === 0)
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
        No health logs recorded yet.
      </p>
    );

  return (
    <div className="space-y-4">
      {logs
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((log) => (
          <div
            key={log.date}
            className="relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-gray-200 dark:border-gray-700"
          >
            <button
              title="Delete all logs for this date"
              onClick={() => deleteLogsForDate(log.date)}
              className="absolute top-3 right-4 text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {log.date}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Sleep Hours: {log.sleepHours}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Nutrition Quality: {log.nutritionQuality}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Meditation Minutes: {log.meditationMinutes}
            </p>
          </div>
        ))}
    </div>
  );
}
