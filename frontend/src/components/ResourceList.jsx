import React from "react";
import ResourceCard from "./ResourceCard";

export default function ResourceList({ resources, toggleBookmark, deleteResource }) {
  if (resources.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-400 mt-10">No resources found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          toggleBookmark={toggleBookmark}
          onDelete={deleteResource}
        />
      ))}
    </div>
  );
}
