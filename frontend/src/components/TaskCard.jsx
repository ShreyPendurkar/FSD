import React from "react";

const priorityColors = {
  Low: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  High: "bg-red-300 text-red-900",
};

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const overdue = task.status === "Pending" && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border dark:border-gray-700 mb-4 transition hover:shadow-lg ${
        overdue ? "border-red-500" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          &times;
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-1 mb-3 whitespace-pre-wrap">
        {task.description}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span
          className={`px-2 py-1 rounded-full font-semibold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority} Priority
        </span>
        <span className={overdue ? "text-red-600 font-bold" : ""}>
          Due: {task.dueDate}
        </span>
      </div>
      <button
        onClick={() =>
          onStatusChange(task._id, {
            status: task.status === "Pending" ? "Completed" : "Pending",
          })
        }
        className={`mt-4 w-full py-2 rounded ${
          task.status === "Completed"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 hover:bg-gray-500"
        } text-white font-semibold transition`}
      >
        Mark as {task.status === "Pending" ? "Completed" : "Pending"}
      </button>
    </div>
  );
}
