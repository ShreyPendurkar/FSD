import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { useExperiments } from "../hooks/useExperiments";
import ExperimentCard from "../components/ExperimentCard";
import ProgressBar from "../components/ProgressBar";

export default function Experiments() {
  const { experiments, updateStatus, addExperiment, deleteExperiment, progressPercent, loading, error } = useExperiments();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    try {
      await addExperiment(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding experiment:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">Loading experiments...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">Error loading experiments: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Experiments & Learning Path
      </h1>

      <section className="mb-8">
        <label htmlFor="title" className="block font-semibold mb-1 dark:text-gray-300">
          New Experiment Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-4"
          placeholder="Enter experiment title"
          disabled={saving}
        />
        <label htmlFor="description" className="block font-semibold mb-1 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-4"
          placeholder="Enter description (optional)"
          rows={3}
          disabled={saving}
        />
        <button
          onClick={handleAdd}
          className="px-6 py-3 rounded-lg bg-gradient-to-tr from-green-600 to-green-400 text-white font-semibold shadow hover:from-green-700 hover:to-green-500 transition"
          disabled={saving}
        >
          {saving ? "Adding..." : "Add Experiment"}
        </button>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Overall Progress</h2>
        <ProgressBar progress={progressPercent} />
        <p className="mt-2 text-gray-700 dark:text-gray-300">{progressPercent}% completed</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-6 dark:text-gray-200">Current Experiments</h2>
        {experiments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No experiments found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {experiments.map((experiment) => (
              <ExperimentCard
                key={experiment._id}
                experiment={experiment}
                onStatusChange={updateStatus}
                onDelete={deleteExperiment}  // Pass delete handler here
              />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
