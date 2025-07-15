export interface Task {
  id?: number;

  title: string;
  description?: string;

  start_date: Date;
  due_date?: Date;

  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";

  assignee_id?: number;
}