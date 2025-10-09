import React from "react";
import { FaBookmark, FaRegBookmark, FaExternalLinkAlt } from "react-icons/fa";

export default function ResourceCard({ resource, toggleBookmark, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 mb-4 transition hover:shadow-lg">
      <div className="flex justify-between items-start">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
        >
          {resource.title} <FaExternalLinkAlt size={14} />
        </a>
        <button
          onClick={() => toggleBookmark(resource._id)}
          title={resource.bookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-pressed={resource.bookmarked}
          className="text-yellow-500 hover:text-yellow-600"
        >
          {resource.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{resource.description}</p>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-semibold">
        Category: {resource.category}
      </div>
      <button
        onClick={() => onDelete(resource._id)}
        className="mt-4 px-4 py-1 text-xs font-semibold text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );
}
