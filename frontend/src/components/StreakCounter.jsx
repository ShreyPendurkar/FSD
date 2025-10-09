import React from "react";

export default function StreakCounter({ currentStreak }) {
  return (
    <div className="bg-gradient-to-tr from-yellow-400 to-red-500 p-6 rounded-3xl shadow-lg text-center text-white">
      <p className="text-xl font-semibold">🔥 Current Learning Streak</p>
      <p className="text-5xl font-extrabold mt-3">{currentStreak}</p>
      <p className="text-sm mt-1">day{currentStreak !== 1 ? "s" : ""} in a row</p>
    </div>
  );
}
