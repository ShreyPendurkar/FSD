import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function useCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  async function fetchEvents(startDate = null, endDate = null) {
    setLoading(true);
    try {
      let url = `${apiUrl}/api/events`;
      if (startDate && endDate) {
        url += `?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
      }
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  async function addEvent(event) {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error("Failed to add event");
      const savedEvent = await response.json();
      setEvents((prev) => [...prev, savedEvent]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateEvent(id, updatedFields) {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error("Failed to update event");
      const updatedEvent = await response.json();
      setEvents((prev) =>
        prev.map((event) => (event._id === id ? updatedEvent : event))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteEvent(id) {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete event");
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}
