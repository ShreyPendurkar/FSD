import React, { useState, useEffect } from "react";

// event prop is either null (for add) or an event object (for edit)
export default function EventForm({ onSave, onCancel, event, saving, defaultStart, defaultEnd, onDelete }) {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || (defaultStart ? defaultStart.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)));
  const [startTime, setStartTime] = useState(event?.startTime || (defaultStart ? defaultStart.toTimeString().slice(0, 5) : "09:00"));
  const [endTime, setEndTime] = useState(event?.endTime || (defaultEnd ? defaultEnd.toTimeString().slice(0, 5) : "10:00"));

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
    } else {
      setTitle("");
      setDate(defaultStart ? defaultStart.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
      setStartTime(defaultStart ? defaultStart.toTimeString().slice(0, 5) : "09:00");
      setEndTime(defaultEnd ? defaultEnd.toTimeString().slice(0, 5) : "10:00");
    }
  }, [event, defaultStart, defaultEnd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a title for the event");
      return;
    }
    if (endTime <= startTime) {
      alert("End time must be after start time");
      return;
    }
    onSave({ title: title.trim(), date, startTime, endTime });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {event ? "Edit Note/Event" : "Add Note/Event"}
        </h2>
        <div>
          <label className="block font-semibold mb-1 text-gray-900 dark:text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            required
            disabled={saving}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-900 dark:text-white">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            required
            disabled={saving}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-gray-900 dark:text-white">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              required
              disabled={saving}
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1 text-gray-900 dark:text-white">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              required
              disabled={saving}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            disabled={saving}
          >
            Cancel
          </button>
          {event && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(event.id)}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              disabled={saving}
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
