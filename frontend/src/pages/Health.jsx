import React from "react";
import MainLayout from "../components/MainLayout";
import HealthLogForm from "../components/HealthLogForm";
import HealthLogsList from "../components/HealthLogsList";
import { useHealth } from "../hooks/useHealth";

export default function Health() {
  const {
    groupedLogs,
    visible,
    addOrUpdateLog,
    deleteLogsForDate,
    loading,
    error
  } = useHealth();

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">Loading health logs...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">Error loading health logs: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Health & Wellness Logs
        </h1>
        <button
          onClick={() => {}}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
        >
          {visible ? "Hide Logs" : "Show Logs"}
        </button>
      </div>
      <HealthLogForm addOrUpdateLog={addOrUpdateLog} logs={groupedLogs} />
      {visible && <HealthLogsList logs={groupedLogs} deleteLogsForDate={deleteLogsForDate} />}
    </MainLayout>
  );
}
