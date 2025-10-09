import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt, FaLock, FaRocket, FaUserPlus, FaRegLightbulb, FaChartLine, FaHeart, FaEnvelope } from 'react-icons/fa';
const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (username && email && password) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          setError(data.msg || 'Registration failed');
        } else {
          navigate('/login');
        }
      } catch (err) {
        setLoading(false);
        setError('Server error. Please try again later.');
      }
    } else {
      setError('Please fill all fields correctly');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-blue-400 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition relative">
      {/* SVG Dot Pattern */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#6b7280" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Card */}
      <div className="w-full max-w-lg relative z-10">
        <div className="flex flex-col items-center mb-2">
          <span className="bg-gradient-to-tr from-blue-700 via-blue-500 to-yellow-400 text-white w-20 h-20 flex items-center justify-center rounded-full shadow-2xl mb-4 border-4 border-white dark:border-gray-900">
            <FaRocket className="text-4xl" />
          </span>
          <h1 className="font-extrabold text-4xl tracking-tight text-blue-700 dark:text-blue-200 text-center">
            EduFlow
          </h1>
          <span className="font-medium text-lg text-blue-800 dark:text-blue-200 mb-1 text-center">
            Accelerate your learning journey!
          </span>
        </div>
        <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl ring-4 ring-blue-300/20 border border-blue-100 dark:border-gray-800 p-12 flex flex-col gap-7">
          <div className="flex flex-col items-center mb-2">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-white tracking-tight mb-1">Create your EduFlow account</h2>
            <span className="text-base mt-1 text-blue-600 dark:text-blue-300 flex flex-row items-center gap-2">
              <FaRegLightbulb className="text-yellow-300" /> Start achieving more—track, grow, and personalize your progress.
            </span>
          </div>
          {error && (
            <div className="bg-red-100 rounded text-red-700 p-2 text-sm text-center font-medium shadow-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <FaUserAlt className="absolute left-4 top-3 text-blue-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none transition text-lg"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
                autoFocus
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3 text-blue-400" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none transition text-lg"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-3 text-blue-400" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none transition text-lg"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-3 text-blue-400" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none transition text-lg"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <button
              className="w-full px-6 py-4 mt-2 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-xl shadow-lg transition duration-150"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-base text-gray-700 dark:text-gray-300">Already have an account? </span>
            <Link to="/login" className="font-semibold text-blue-700 hover:underline dark:text-blue-300 text-base">Login</Link>
          </div>
        </div>
        {/* Features Bar */}
        <div className="mt-10 px-8">
          <div className="flex flex-row justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaHeart className="text-2xl text-pink-500 mb-1" />
              <span className="text-sm font-semibold text-pink-700 dark:text-pink-400">Well-being Focus</span>
            </div>
            <div className="flex flex-col items-center">
              <FaChartLine className="text-2xl text-blue-500 mb-1" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">Progress Analytics</span>
            </div>
            <div className="flex flex-col items-center">
              <FaRegLightbulb className="text-2xl text-yellow-400 mb-1" />
              <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">Personalized Growth</span>
            </div>
          </div>
        </div>
        <div className="mt-7 text-center text-gray-700 dark:text-gray-100"></div>
      </div>
    </div>
  );
}
