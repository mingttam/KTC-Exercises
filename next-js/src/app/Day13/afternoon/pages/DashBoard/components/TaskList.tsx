import Link from "next/link";
import { Task } from "../../../types";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-xl shadow-md text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-white">ID</th>
            <th className="px-4 py-2 text-left font-semibold text-white">Title</th>
            <th className="px-4 py-2 text-left font-semibold text-white">Description</th>
            <th className="px-4 py-2 text-left font-semibold text-white">Assignee ID</th>
            <th className="px-4 py-2 text-left font-semibold text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b last:border-none">
              <td className="px-4 py-2">{task.id}</td>
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.description}</td>
              <td className="px-4 py-2">{task.assignee_id}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/Day12/afternoon/TaskISR/${task.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
