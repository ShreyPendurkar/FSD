import React from "react";
import { useExperiments } from "../hooks/useExperiments";
import ExperimentCard from "./ExperimentCard";

export default function ExperimentContainer() {
  const {
    experiments,
    loading,
    error,
    updateStatus,
    deleteExperiment, // ensure included
  } = useExperiments();

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperiment(id);
    } catch (err) {
      console.error("Error deleting experiment:", err);
    }
  };

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading experiments...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading experiments: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {experiments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No experiments found.</p>
      ) : (
        experiments.map((exp) => (
          <ExperimentCard
            key={exp._id}
            experiment={exp}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}   // make sure this prop is passed
          />
        ))
      )}
    </div>
  );
}
