import React from "react";

export default function GoalCard({
  goal,
  toggleCompletion,
  addHabitHistory,
  removeHabitHistory,
  deleteGoal,
}) {
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = goal.history.includes(today);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border border-gray-300 dark:border-gray-700 mb-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{goal.title}</h3>
        <button
          onClick={() => deleteGoal(goal._id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete Goal"
          title="Delete Goal"
        >
          &times;
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <strong>Specific:</strong> {goal.specific}
      </p>
      {goal.measurable && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Measurable:</strong> {goal.measurable}
        </p>
      )}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <strong>Achievable:</strong> {goal.achievable ? "Yes" : "No"} |{" "}
        <strong>Relevant:</strong> {goal.relevant ? "Yes" : "No"}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        <strong>Time-bound:</strong> {goal.timeBound || "Not specified"}
      </p>

      {goal.recurring && (
        <>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong>Recurrence:</strong> {goal.recurrenceFrequency}
          </p>
          <button
            onClick={() => addHabitHistory(goal._id)}
            disabled={completedToday}
            className={`px-4 py-2 rounded text-white font-semibold transition ${
              completedToday ? "bg-green-600 cursor-default" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {completedToday ? "Completed Today" : "Mark Completed Today"}
          </button>
          <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            <strong>Completion History:</strong>
            <ul className="list-disc list-inside max-h-24 overflow-auto">
              {goal.history.map((date) => (
                <li key={date} className="flex justify-between items-center">
                  <span>{date}</span>
                  <button
                    onClick={() => removeHabitHistory(goal._id, date)}
                    aria-label={`Remove completion record for ${date}`}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <button
        onClick={() => toggleCompletion(goal._id)}
        className={`mt-3 w-full py-2 rounded font-semibold shadow-md transition ${
          goal.completed ? "bg-green-600 text-white" : "bg-gray-400 text-gray-900"
        }`}
      >
        {goal.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
    </div>
  );
}
