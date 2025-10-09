import React from "react";
import { useSkills } from "../hooks/useSkills";
import SkillCard from "./SkillCard";

export default function SkillsList() {
  const {
    skills,
    loading,
    error,
    markPracticed,
    updateChecklist,
    resetChecklist,
    removeSkill,
  } = useSkills();

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading skills: {error}</div>;
  }

  return (
    <div>
      {skills.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No skills found.</p>
      ) : (
        skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            markPracticed={markPracticed}
            updateChecklist={updateChecklist}
            resetChecklist={resetChecklist}
            removeSkill={removeSkill}
          />
        ))
      )}
    </div>
  );
}
