import React from "react";
import { useHealth } from "../hooks/useHealth";
import HealthLogsList from "./HealthLogsList";

export default function HealthLogsContainer() {
  const { logs, loading, error } = useHealth();

  if (loading) {
    return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Loading health logs...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600 dark:text-red-400">Error loading health logs: {error}</div>;
  }

  return <HealthLogsList logs={logs} />;
}
