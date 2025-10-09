import React from 'react';

const statusClasses = {
  "Pending": "bg-gray-200 text-gray-800",
  "Completed": "bg-green-300 text-green-900",
};

const statusOptions = ["Pending", "Completed"];

export default function ExperimentCard({ experiment, onStatusChange, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{experiment.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{experiment.description}</p>
      <div className="flex items-center gap-3 mb-3">
        {statusOptions.map((status) => (
          <button
            key={status}
            className={
              `py-1 px-3 rounded-full text-sm font-semibold cursor-pointer ` +
              (experiment.status === status
                ? statusClasses[status] + " shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600")
            }
            onClick={() => onStatusChange(experiment._id, status)}
            aria-pressed={experiment.status === status}
          >
            {status}
          </button>
        ))}
        <button
          className="py-1 px-3 rounded-full text-sm font-semibold cursor-pointer bg-red-500 hover:bg-red-600 text-white ml-2"
          onClick={() => onDelete(experiment._id)}
          aria-label="Delete Experiment"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
