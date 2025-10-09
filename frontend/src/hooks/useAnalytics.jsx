import { useEffect, useState } from "react";

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch(`${apiUrl}/api/analytics`, {
          headers: {
            "Authorization": `Bearer ${token}`, // attach token here
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) throw new Error("Failed to fetch analytics data");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [token]);

  return { data, loading, error };
}
