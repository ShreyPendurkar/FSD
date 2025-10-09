import React from "react";

export default function StreakBar({ streak }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img" aria-label="fire" className="text-2xl">🔥</span>
      <span className="font-bold text-lg">{streak}</span>
      <span className="text-sm text-gray-500">day streak</span>
    </div>
  );
}
