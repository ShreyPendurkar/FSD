import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MainLayout from "../components/MainLayout";
import { useCalendar } from "../hooks/useCalendar";
import AuthContext from "../context/AuthContext";
import EventForm from "../components/EventForm";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const { events, loading, error, fetchEvents, addEvent, updateEvent, deleteEvent } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);
  const [saving, setSaving] = useState(false);

  const formattedEvents = events.map(event => ({
    id: event._id,
    title: event.title,
    start: new Date(`${event.date}T${event.startTime}`),
    end: new Date(`${event.date}T${event.endTime}`)
  }));

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setShowForm(true);
    setSlotInfo(null);
  };

  const handleSelectSlot = slot => {
    setSlotInfo(slot);
    setSelectedEvent(null);
    setShowForm(true);
  };

  const handleSave = async eventData => {
    setSaving(true);
    if (selectedEvent) {
      await updateEvent(selectedEvent.id, eventData);
    } else {
      await addEvent(eventData);
    }
    setSaving(false);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    setSaving(true);
    await deleteEvent(id);
    setSaving(false);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEvent(null);
    setSlotInfo(null);
  };

  if (loading)
    return (
      <MainLayout>
        <p className="text-center">Loading calendar...</p>
      </MainLayout>
    );

  if (error)
    return (
      <MainLayout>
        <p className="text-center text-red-600">Error loading calendar: {error}</p>
      </MainLayout>
    );

  return (
    <MainLayout>
      <h1 className="text-4xl mb-6 font-extrabold text-gray-900 dark:text-white tracking-tight">
        Monthly Calendar & Time Blocking
      </h1>
      <div className="rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          defaultView="month"
          views={["month"]}  // Only Month view; no Week/Day buttons
          style={{ height: 600 }}
          eventPropGetter={() => ({
            className:
              "bg-indigo-500 dark:bg-indigo-600 text-white rounded-md border-none font-semibold py-1 px-2"
          })}
          dayPropGetter={() => ({
            className: "calendar-day-cell"
          })}
        />
      </div>
      {showForm && (
        <EventForm
          onSave={handleSave}
          onCancel={handleCancel}
          event={selectedEvent}
          defaultStart={slotInfo?.start}
          defaultEnd={slotInfo?.end}
          saving={saving}
          onDelete={handleDelete}
        />
      )}
      <style>{`
        .calendar-day-cell {
          background: transparent !important;
          color: #1e293b !important;
        }
        .dark .calendar-day-cell {
          background: transparent !important;
          color: #f1f5f9 !important;
        }
        .rbc-header, .rbc-date-cell {
          color: #1e293b !important;
        }
        .dark .rbc-header, .dark .rbc-date-cell {
          color: #f1f5f9 !important;
        }
        .rbc-toolbar-label {
          color: #1e293b !important;
          font-weight: 700;
          font-size: 1.5rem;
        }
        .dark .rbc-toolbar-label {
          color: #f1f5f9 !important;
        }
        .rbc-calendar {
          background: transparent !important;
        }
        .rbc-toolbar button {
          background-color: #6366f1 !important;
          color: #fff !important;
          border-radius: 0.5rem;
          margin: 0 0.25em;
        }
        .dark .rbc-toolbar button {
          background-color: #6366f1 !important;
          color: #fff !important;
        }
        .rbc-event {
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
        }
        .rbc-today {
          background: #e0e7ff !important;
        }
        .dark .rbc-today {
          background: #3730a3 !important;
        }
        .rbc-off-range-bg {
          background-color: #f3f4f6 !important;  /* subtle light-gray background in light mode */
        }
        .rbc-off-range {
          color: #94a3b8 !important;             /* muted text for light mode */
        }
        .dark .rbc-off-range-bg {
          background-color: #283347 !important;  /* distinct background for dark mode */
        }
        .dark .rbc-off-range {
          color: #a3a3a3 !important;             /* muted text for dark mode */
        }
      `}</style>
    </MainLayout>
  );
}
