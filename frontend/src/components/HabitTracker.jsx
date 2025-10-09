import React from "react";

export default function HabitTracker({ history = [] }) {
  if (history.length === 0) return <p>No habit completion history yet.</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {history.map((date) => (
        <div
          key={date}
          className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs select-none"
          title={`Completed on ${date}`}
        >
          {date}
        </div>
      ))}
    </div>
  );
}
