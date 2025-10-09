import React from "react";
import MainLayout from "../components/MainLayout";
import {
  FaRegCheckCircle,
  FaRegLightbulb,
  FaChartLine,
  FaDumbbell,
  FaBullseye,
  FaBookOpen,
  FaHeartbeat,
  FaCalendarAlt,
  FaBookmark,
  FaRocket,
  FaLayerGroup,
  FaCogs,
  FaUsers,
  FaHeart,
  FaMoon,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Welcome Section */}
      <section className="relative rounded-2xl p-8 mb-8 bg-gradient-to-tr from-blue-700/80 via-blue-500/50 to-blue-200/30 dark:from-blue-900/90 dark:to-blue-700/40 text-white shadow-lg border border-blue-200 dark:border-gray-800 text-center w-full max-w-6xl mx-auto transition">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center text-4xl font-black tracking-tight mb-2">
            <FaRocket className="mr-2 text-yellow-300" />
            Welcome to EduFlow!
          </div>
          <div className="text-lg font-medium text-blue-100/80 dark:text-blue-200/80 max-w-4xl mx-auto">
            Supercharge your learning—from scientific skills to healthy habits. Everything you track here helps you grow holistically, not just academically!
          </div>
        </div>
      </section>

      {/* Platform Highlights Section */}
      <section className="mb-12 w-full max-w-6xl mx-auto">
        <h2 className="flex items-center justify-center text-2xl font-bold mb-7 text-blue-700 dark:text-white">
          <FaLayerGroup className="mr-2 text-indigo-400" />
          Platform Highlights
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-md border border-blue-100 dark:border-gray-800 flex flex-col items-center text-center">
            <FaUsers className="text-2xl mb-2 text-blue-500" />
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Centralized Dashboard</span>
            <p className="text-gray-500 dark:text-gray-400">
              See everything about your growth, learning, and wellness in one place.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-md border border-green-100 dark:border-gray-800 flex flex-col items-center text-center">
            <FaCogs className="text-2xl mb-2 text-green-400" />
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Fully Customizable</span>
            <p className="text-gray-500 dark:text-gray-400">
              Tailor every module, tracker, and profile to your unique style and needs.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-md border border-pink-100 dark:border-gray-800 flex flex-col items-center text-center">
            <FaHeart className="text-2xl mb-2 text-pink-400" />
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Holistic Growth</span>
            <p className="text-gray-500 dark:text-gray-400">
              Track progress across habits, skills, and wellness for balanced achievement.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-md border border-fuchsia-100 dark:border-gray-800 flex flex-col items-center text-center">
            <FaChartLine className="text-2xl mb-2 text-fuchsia-400" />
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Insightful Analytics</span>
            <p className="text-gray-500 dark:text-gray-400">
              Visualize streaks, stats, and productivity with rich, motivating charts.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-md border border-teal-100 dark:border-gray-800 flex flex-col items-center text-center">
            <FaMoon className="text-2xl mb-2 text-teal-400" />
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Distraction-Free Design</span>
            <p className="text-gray-500 dark:text-gray-400">
              Enjoy a clean, responsive interface in both light and dark modes.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-md border border-purple-100 dark:border-gray-800 flex flex-col items-center text-center">
            <FaRegLightbulb className="text-2xl mb-2 text-yellow-400" />
            <span className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Collaborative Learning</span>
            <p className="text-gray-500 dark:text-gray-400">
              Share insights, notes, and progress with peers for smarter growth together.
            </p>
          </div>
        </div>
      </section>

      {/* Divider/Accent */}
      <div className="my-12 flex items-center justify-center">
        <span className="h-0.5 w-2/3 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 rounded-full opacity-30 transition" />
      </div>

      {/* Main Features Grid */}
      <section>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white tracking-tight">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-blue-100 dark:border-gray-800 hover:shadow-blue-200 transition">
            <FaRegCheckCircle className="text-3xl mb-2 text-green-500" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Track Progress</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Monitor experiments, skill streaks, tasks, and goal completion.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-purple-100 dark:border-gray-800 hover:shadow-purple-200 transition">
            <FaRegLightbulb className="text-3xl mb-2 text-yellow-400" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Write Notes</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Capture insights, brainstorm ideas, and store reusable code snippets or journal reflections.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-fuchsia-100 dark:border-gray-800 hover:shadow-fuchsia-200 transition">
            <FaChartLine className="text-3xl mb-2 text-blue-500" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Visualize Analytics</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Analyze learning streaks, task stats, goal charts, and weekly productivity.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-green-100 dark:border-gray-800 hover:shadow-green-200 transition">
            <FaDumbbell className="text-3xl mb-2 text-pink-400" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Skill & Hobby Tracker</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Set goals for new skills, practice daily, and build strong streaks with tailored checklists.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-yellow-100 dark:border-gray-800 hover:shadow-yellow-200 transition">
            <FaBullseye className="text-3xl mb-2 text-yellow-500" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Goal Setting & Habits</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Set and track SMART goals, establish recurring habits, and visualize your progress history.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-sky-100 dark:border-gray-800 hover:shadow-sky-200 transition">
            <FaBookmark className="text-3xl mb-2 text-sky-500" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Resources & Bookmarks</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Collect, organize, and bookmark key articles, links, videos, and wishlists for future learning.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-red-100 dark:border-gray-800 hover:shadow-red-200 transition">
            <FaHeartbeat className="text-3xl mb-2 text-red-500" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Health & Wellness</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Log sleep, nutrition, and meditation to keep your mind and body in sync with your learning life.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-indigo-100 dark:border-gray-800 hover:shadow-indigo-200 transition">
            <FaCalendarAlt className="text-3xl mb-2 text-indigo-400" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Calendar & Time Blocking</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Plan your days with a native weekly calendar and drag-and-drop time blocks for deep work.
            </p>
          </div>
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-teal-100 dark:border-gray-800 hover:shadow-teal-200 transition">
            <FaBookOpen className="text-3xl mb-2 text-teal-400" />
            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Experience Log</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Record books, courses, podcasts, and enrich your journey with reviews and ratings.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
