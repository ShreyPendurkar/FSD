import React from "react";
import { useGoals } from "../hooks/useGoals";
import GoalCard from "./GoalCard";

export default function GoalsList() {
  const {
    goals,
    loading,
    error,
    toggleCompletion,
    addHabitHistory,
    removeHabitHistory,
    deleteGoal,
  } = useGoals();

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading goals...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading goals: {error}</div>;
  }

  return (
    <div>
      {goals.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No goals found.</p>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal._id}
            goal={goal}
            toggleCompletion={toggleCompletion}
            addHabitHistory={addHabitHistory}
            removeHabitHistory={removeHabitHistory}
            deleteGoal={deleteGoal}
          />
        ))
      )}
    </div>
  );
}
