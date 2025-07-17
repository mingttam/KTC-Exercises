import { Task } from "../../types";
import TaskList from "./components/TaskList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../lib/auth";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/Day13/afternoon");

  try {
    const cookieStore = cookies();
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/task`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch tasks:", response.status, errorText);

      return (
        <div className="p-4">
          <h1 className="text-xl font-bold text-red-600">Unable to Load Tasks</h1>
          <p className="text-gray-600">Please try refreshing the page or contact support.</p>
        </div>
      );
    }

    const tasks: Task[] = await response.json();
    return <TaskList tasks={tasks} />;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-600">Error Loading Tasks</h1>
        <p className="text-gray-600">Unable to load tasks. Please try again later.</p>
      </div>
    );
  }
};

export default Dashboard;
