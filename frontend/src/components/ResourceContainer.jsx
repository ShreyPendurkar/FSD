import React from "react";
import { useResources } from "../hooks/useResources";
import ResourceCard from "./ResourceCard";

export default function ResourceList() {
  const { resources, loading, error, toggleBookmark, deleteResource } = useResources();

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading resources...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading resources: {error}</div>;
  }

  return (
    <div>
      {resources.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No resources found.</p>
      ) : (
        resources.map((res) => (
          <ResourceCard
            key={res.id}
            resource={res}
            toggleBookmark={toggleBookmark}
            onDelete={deleteResource}
          />
        ))
      )}
    </div>
  );
}
