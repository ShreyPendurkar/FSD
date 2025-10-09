import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import ResourceForm from "../components/ResourceForm";
import ResourceList from "../components/ResourceList";
import { useResources } from "../hooks/useResources";

export default function Resources() {
  const {
    resources,
    loading,
    error,
    saving,
    addResource,
    toggleBookmark,
    deleteResource,
    filterByCategory,
  } = useResources();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const filteredResources = filterByCategory(categoryFilter);

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-400 p-10">Loading resources...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400 p-10">Error loading resources: {error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">
        Resource Library & Bookmarks
      </h1>

      <ResourceForm addResource={addResource} saving={saving} error={error} />

      <div className="mb-6 flex flex-wrap gap-3">
        {["All", "Documentation", "Tutorial", "Video", "Article", "Other"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-full font-semibold tracking-wide transition ${
              categoryFilter === cat
                ? "bg-purple-700 text-white shadow-md"
                : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-purple-600 hover:text-white"
            }`}
            disabled={saving}
          >
            {cat}
          </button>
        ))}
      </div>

      <ResourceList
        resources={filteredResources}
        toggleBookmark={toggleBookmark}
        deleteResource={deleteResource}
      />
    </MainLayout>
  );
}
