import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
  const {
    tasks,
    loading,
    error,
    saving,
    addTask,
    updateTask,
    deleteTask,
    filteredTasks,
  } = useTasks();

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formPriority, setFormPriority] = useState("Medium");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDueDate) return;

    await addTask({
      title: formTitle.trim(),
      description: formDescription.trim(),
      dueDate: formDueDate,
      priority: formPriority,
    });

    setFormTitle("");
    setFormDescription("");
    setFormDueDate("");
    setFormPriority("Medium");
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">Loading tasks...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">Error loading tasks: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Task & Deadline Management
      </h1>

      <TaskForm
        addTask={async (task) => {
          await addTask(task);
        }}
        saving={saving}
        onTitleChange={setFormTitle}
        onDescriptionChange={setFormDescription}
        onDueDateChange={setFormDueDate}
        onPriorityChange={setFormPriority}
        title={formTitle}
        description={formDescription}
        dueDate={formDueDate}
        priority={formPriority}
      />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Pending Tasks</h2>
        {filteredTasks("pending").length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No pending tasks</p>
        ) : (
          filteredTasks("pending").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={updateTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Completed Tasks</h2>
        {filteredTasks("completed").length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No completed tasks</p>
        ) : (
          filteredTasks("completed").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={updateTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </section>
    </MainLayout>
  );
}
