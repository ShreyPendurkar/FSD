import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className="bg-green-500 h-4 transition-all duration-500"
        style={{ width: `${progress}%` }}
        aria-label={`Progress: ${progress}%`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      />
    </div>
  );
}
