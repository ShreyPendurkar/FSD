import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRegSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Toggle dark mode
  const handleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/70 dark:bg-gray-950/70 border-b border-slate-200 dark:border-gray-800 backdrop-blur-lg shadow">
      <div className="md:hidden font-extrabold text-2xl text-blue-800 dark:text-white">EduFlow</div>
      <div className="flex items-center gap-4">
        <span className="hidden md:inline font-semibold text-gray-800 dark:text-gray-200 tracking-tight">
          Welcome, <span className="text-blue-700 dark:text-blue-200">{user?.username || "User"}</span>
        </span>
        <button
          aria-label="Toggle theme"
          className="bg-blue-200 dark:bg-gray-700 p-2 rounded-full shadow hover:scale-105 transition"
          onClick={handleTheme}
        >
          <FaMoon className="hidden dark:block text-blue-100" size={18} />
          <FaRegSun className="dark:hidden text-yellow-500" size={18} />
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-gradient-to-tr from-blue-700 to-fuchsia-700 px-5 py-2 rounded-full text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
