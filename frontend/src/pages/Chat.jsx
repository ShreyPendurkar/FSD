import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import MainLayout from "../components/MainLayout";
import AuthContext from "../context/AuthContext";

const socket = io('http://localhost:5000'); // update for production

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    socket.on('receive_message', (m) => {
      setChat((prev) => {
        const updated = [...prev, m];
        localStorage.setItem("chatHistory", JSON.stringify(updated));
        return updated;
      });
    });
    return () => socket.off('receive_message');
  }, []);

  function send(e) {
    e.preventDefault();
    if (msg.trim()) {
      const messageData = {
        user: user?.username || "User",
        content: msg,
        timestamp: new Date().toISOString()
      };
      socket.emit("send_message", messageData);
      setMsg('');
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl mb-6 font-bold text-blue-700 dark:text-white">Global Chat</h1>
      <form onSubmit={send} className="flex gap-4 mb-8">
        <input
          value={msg} onChange={e => setMsg(e.target.value)}
          className="flex-1 p-3 rounded-lg border bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          placeholder="Type a message..."
        />
        <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-tr from-purple-700 to-pink-500 text-white font-bold">Send</button>
      </form>
      <ul className="space-y-2">
        {chat.map((m, i) => (
          <li key={i} className="bg-gray-100 dark:bg-gray-800 rounded px-4 py-2 text-gray-900 dark:text-white">
            <strong>{m.user}</strong>
            {' '}
            <span className="text-xs text-gray-500 ml-2">
              {new Date(m.timestamp).toLocaleTimeString()}
            </span>
            <br />
            {m.content}
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}
