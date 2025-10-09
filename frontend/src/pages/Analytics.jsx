import React from "react";
import MainLayout from "../components/MainLayout";
import StreakCounter from "../components/StreakCounter";
import SummaryCard from "../components/SummaryCard";
import { FaFlask, FaStickyNote, FaTasks } from "react-icons/fa";
import { useAnalytics } from "../hooks/useAnalytics"; // This should fetch from /api/analytics

export default function Analytics() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">
          Loading analytics...
        </p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">
          Error loading analytics data: {error}
        </p>
      </MainLayout>
    );
  }

  const { completedExperiments, totalNotes, completedTasks, currentStreak } = data || {};

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Learning Analytics & Streaks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          title="Experiments Completed"
          value={completedExperiments}
          icon={<FaFlask />}
          colorClass="bg-blue-600"
        />
        <SummaryCard
          title="Notes Written"
          value={totalNotes}
          icon={<FaStickyNote />}
          colorClass="bg-yellow-500"
        />
        <SummaryCard
          title="Tasks Completed"
          value={completedTasks}
          icon={<FaTasks />}
          colorClass="bg-green-600"
        />
        <StreakCounter currentStreak={currentStreak} />
      </div>

      {/* Future: Add charts or calendar visualizations here */}
    </MainLayout>
  );
}
