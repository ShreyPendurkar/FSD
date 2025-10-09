import React from "react";
import { useResources } from "../hooks/useResources";
import ResourceList from "./ResourceList";

export default function ResourceListContainer() {
  const { resources, loading, error, toggleBookmark, deleteResource } = useResources();

  if (loading) return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading resources...</div>;
  if (error) return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading resources: {error}</div>;

  return (
    <ResourceList
      resources={resources}
      toggleBookmark={toggleBookmark}
      deleteResource={deleteResource}
    />
  );
}
