import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFlask,
  FaStickyNote,
  FaBookOpen,
  FaTasks,
  FaDumbbell,
  FaChartLine,
  FaBullseye,
  FaHeartbeat,
  FaCalendarAlt,
  FaComments // Use this icon for 'Chat'
} from "react-icons/fa";

const navLinks = [
  { to: "/", label: "Dashboard", icon: <FaHome /> },
  { to: "/experiments", label: "Experiments", icon: <FaFlask /> },
  { to: "/notes", label: "Notes", icon: <FaStickyNote /> },
  { to: "/resources", label: "Resources", icon: <FaBookOpen /> },
  { to: "/tasks", label: "Tasks", icon: <FaTasks /> },
  { to: "/analytics", label: "Analytics", icon: <FaChartLine /> }, // Fixed
  { to: "/skills", label: "Skills & Hobbies", icon: <FaDumbbell /> },
  { to: "/goals", label: "Goals & Habits", icon: <FaBullseye /> },
  { to: "/health", label: "Health & Wellness", icon: <FaHeartbeat /> },
  { to: "/calendar", label: "Calendar & Time Blocking", icon: <FaCalendarAlt /> },
  { to: "/chat", label: "Chat", icon: <FaComments /> } // Added
];

export default function Sidebar() {
  return (
    <aside className="bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 w-64 min-h-screen hidden md:flex flex-col border-r border-gray-700 shadow-2xl">
      <div className="flex items-center justify-center h-20 font-extrabold text-2xl tracking-tight bg-white/10 text-white shadow-inner rounded-b-md mb-2 select-none">
        <span>EduFlow</span>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  "flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition font-medium group " +
                  (isActive
                    ? "bg-blue-500/80 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-600/80 hover:text-white hover:shadow")
                }
                end={link.to === "/"}
              >
                <span className="text-lg group-hover:animate-bounce">{link.icon}</span>
                <span className="text-base">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto mb-6 text-center text-xs text-blue-100 opacity-80">
        &copy; {new Date().getFullYear()} EduFlow. All rights reserved.
      </div>
    </aside>
  );
}
