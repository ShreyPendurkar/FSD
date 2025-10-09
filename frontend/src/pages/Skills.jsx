import React from "react";
import MainLayout from "../components/MainLayout";
import SkillTrackerForm from "../components/SkillTrackerForm";
import SkillCard from "../components/SkillCard";
import { useSkills } from "../hooks/useSkills";

export default function Skills() {
  const {
    skills,
    loading,
    error,
    addSkill,
    markPracticed,
    updateChecklist,
    resetChecklist,
    removeSkill,
  } = useSkills();

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">Loading skills...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">Error loading skills: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Skills & Hobby Tracker
      </h1>
      <SkillTrackerForm addSkill={addSkill} />
      {skills.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          No tracked skills/hobbies yet.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              markPracticed={markPracticed}
              updateChecklist={updateChecklist}
              resetChecklist={resetChecklist}
              removeSkill={removeSkill}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}
