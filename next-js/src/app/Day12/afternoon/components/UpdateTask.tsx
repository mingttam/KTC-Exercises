"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Task } from "../types";

import { useRouter } from "next/navigation";

interface IUpdateTaskFormInput {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "to_do" | "in_progress" | "done";
  start_date: string;
  due_date: string;
  assignee_id: number;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().oneOf(["low", "medium", "high"]).required("Priority is required"),
  status: yup.string().oneOf(["to_do", "in_progress", "done"]).required("Status is required"),
  start_date: yup.string().required("Start date is required"),
  due_date: yup.string().required("Due date is required"),
  assignee_id: yup.number().required("Assignee ID is required"),
});

const TaskDetail = ({ task }: { task: Task }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateTaskFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      start_date: task.start_date?.toString().split("T")[0],
      due_date: task.due_date?.toString().split("T")[0],
      assignee_id: task.assignee_id,
    },
  });

  const onSubmit: SubmitHandler<IUpdateTaskFormInput> = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/workspaces/tasks/${task.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task");
    }
    router.push("/Day12/afternoon");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title")} defaultValue={task.title} className="border p-2 w-full" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            defaultValue={task.description}
            className="border p-2 w-full"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label>Priority</label>
          <select
            {...register("priority")}
            defaultValue={task.priority}
            className="border p-2 w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
        </div>

        <div>
          <label>Status</label>
          <select {...register("status")} defaultValue={task.status} className="border p-2 w-full">
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status.message}</p>}
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            {...register("start_date")}
            defaultValue={task.start_date?.toString().split("T")[0]}
            className="border p-2 w-full"
          />
          {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
        </div>

        <div>
          <label>Due Date</label>
          <input
            type="date"
            {...register("due_date")}
            defaultValue={task.due_date?.toString().split("T")[0]}
            className="border p-2 w-full"
          />
          {errors.due_date && <p className="text-red-500">{errors.due_date.message}</p>}
        </div>
        <div>
          <label>Assignee ID</label>
          <input
            type="number"
            {...register("assignee_id")}
            defaultValue={task.assignee_id}
            className="border p-2 w-full"
          />
          {errors.assignee_id && <p className="text-red-500">{errors.assignee_id.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetail;
