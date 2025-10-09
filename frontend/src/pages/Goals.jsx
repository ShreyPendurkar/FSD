import React from "react";
import MainLayout from "../components/MainLayout";
import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";
import HabitTracker from "../components/HabitTracker";
import { useGoals } from "../hooks/useGoals";

export default function Goals() {
  const {
    goals,
    loading,
    error,
    addGoal,
    toggleCompletion,
    addHabitHistory,
    removeHabitHistory,
    deleteGoal,
  } = useGoals();

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">Loading goals...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">Error loading goals: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Goal Setting & Habit Formation
      </h1>

      <GoalForm addGoal={addGoal} />

      {goals.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">No goals set yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div key={goal.id} className="flex flex-col gap-4">
              <GoalCard
                goal={goal}
                toggleCompletion={toggleCompletion}
                addHabitHistory={addHabitHistory}
                removeHabitHistory={removeHabitHistory}
                deleteGoal={deleteGoal}
              />
              {goal.recurring && <HabitTracker history={goal.history} />}
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
