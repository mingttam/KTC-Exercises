/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

import apiClient from "../libraries/api-client";
import { useAuthStore } from "../useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const { loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = (await apiClient.get("/workspaces/tasks")) as any[];
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white mb-6">Tasks</h1>
      {tasks?.map((task: any) => (
        <div
          key={task.id}
          className="border border-gray-600 p-4 mb-3 rounded-lg bg-gray-800 shadow-lg hover:bg-gray-750 transition-colors"
        >
          <h2 className="text-xl font-semibold text-white mb-2">{task.title}</h2>
          <p className="text-gray-300 mb-2">{task.description}</p>
          <p className="text-gray-400">
            Status: <span className="text-blue-400 font-medium">{task.status}</span>
          </p>
        </div>
      ))}
      {tasks?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No tasks available</p>
        </div>
      )}
    </div>
  );
}
