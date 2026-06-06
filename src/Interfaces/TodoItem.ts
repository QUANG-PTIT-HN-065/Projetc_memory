export default interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  deadline?: string;
}