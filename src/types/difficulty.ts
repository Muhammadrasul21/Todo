import type { AppDispatch } from "../redux/store";

export const Difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export interface Task {
  id: number;
  title: string;
  level: Difficulty;
}

export interface TaskListProps {
  tasks: Task[];
  dispatch: any;
}

export interface TaskItemProps {
  task: Task;
  index: number;
  dispatch: AppDispatch;
  defaultLevel: Difficulty;
  showDoneButton?: boolean;
  showUndoButton?: boolean;
  onUndo?: (id: number) => void;
}
