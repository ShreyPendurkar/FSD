import React from "react";
import StreakBar from "./StreakBar";

export default function SkillCard({
  skill,
  markPracticed,
  updateChecklist,
  resetChecklist,
  removeSkill
}) {
  const today = new Date().toISOString().slice(0, 10);
  const practicedToday = skill.lastPracticed === today;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {skill.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{skill.goal}</p>
        </div>
        <button
          onClick={() => removeSkill(skill._id)}
          className="text-red-500 hover:text-red-600"
          title="Delete skill"
        >
          &times;
        </button>
      </div>
      <StreakBar streak={skill.streak} />
      <div>
        <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">Practice Checklist:</p>
        <ul className="space-y-2">
          {skill.checklist.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={e => updateChecklist(skill._id, idx, e.target.checked)}
                className="h-4 w-4"
              />
              <span
                className={
                  item.checked
                    ? "line-through text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => resetChecklist(skill._id)}
          className="text-xs mt-2 text-blue-500 hover:underline"
        >
          Reset Checklist
        </button>
      </div>
      <button
        onClick={() => markPracticed(skill._id)}
        className={`mt-2 px-4 py-2 rounded font-semibold shadow transition ${
          practicedToday
            ? "bg-green-500 text-white cursor-default"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={practicedToday}
      >
        {practicedToday ? "Practiced Today" : "Mark Practice for Today"}
      </button>
    </div>
  );
}
