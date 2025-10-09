import React from "react";

export default function SummaryCard({ title, value, icon, colorClass }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl p-6 shadow-lg text-white ${colorClass}`}
      role="region"
      aria-label={title}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
}
