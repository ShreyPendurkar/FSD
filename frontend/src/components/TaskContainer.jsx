import React from "react";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading tasks: {error}</div>;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(id, updatedFields) => updateTask(id, updatedFields)}
            onDelete={deleteTask}
          />
        ))
      )}
    </div>
  );
}
