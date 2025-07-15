"use client";

import useSWR from "swr";

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const fetcher = (url: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

export default function TaskCSR() {
  const { data: tasks, isLoading } = useSWR(`${baseUrl}/workspaces/tasks`, fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (!tasks || !Array.isArray(tasks)) return <p>No tasks found.</p>;
  return (
    <div>
      <h1>Tasks (CSR)</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {tasks.map((task: any) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
