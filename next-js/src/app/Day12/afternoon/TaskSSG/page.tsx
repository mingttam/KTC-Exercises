const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function TaskSSG() {
  const tasks = await fetch(`${baseUrl}/workspaces/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache",
  }).then((res) => res.json());

  return (
    <div>
      <h1>Tasks (SSG)</h1>
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
