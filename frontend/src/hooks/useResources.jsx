import { useState, useEffect } from "react";

export function useResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  // Fetch resources from backend when hook loads
  useEffect(() => {
    async function fetchResources() {
      setLoading(true);
      try {
        const response = await fetch("/api/resources", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // attach token
          },
        });
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err.message);
        setResources([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, [token]);

  // Add a new resource
  async function addResource(resource) {
    try {
      const newResource = {
        bookmarked: false,
        createdAt: new Date().toISOString(),
        ...resource,
      };
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // attach token
        },
        body: JSON.stringify(newResource),
      });
      if (!response.ok) throw new Error("Failed to add resource");
      const createdResource = await response.json();
      setResources((prev) => [createdResource, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  // Update a resource by id
  async function updateResource(id, updatedFields) {
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // attach token
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error("Failed to update resource");
      const updatedResource = await response.json();
      setResources((prev) =>
        prev.map((res) => (res._id === id ? updatedResource : res))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a resource by id
  async function deleteResource(id) {
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,  // attach token
        },
      });
      if (!response.ok) throw new Error("Failed to delete resource");
      setResources((prev) => prev.filter((res) => res._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Toggle bookmark state of a resource by id
  async function toggleBookmark(id) {
    try {
      const response = await fetch(`/api/resources/${id}/toggleBookmark`, {
        method: "PATCH", // or PUT if your backend expects it
        headers: {
          "Authorization": `Bearer ${token}`,  // attach token
        }
      });
      if (!response.ok) throw new Error("Failed to toggle bookmark");
      const updatedResource = await response.json();
      setResources((prev) =>
        prev.map((res) => (res._id === id ? updatedResource : res))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // Filter resources by category client side
  function filterByCategory(category) {
    return category === "All"
      ? resources
      : resources.filter((res) => res.category === category);
  }

  return {
    resources,
    loading,
    error,
    addResource,
    updateResource,
    deleteResource,
    toggleBookmark,
    filterByCategory,
  };
}
