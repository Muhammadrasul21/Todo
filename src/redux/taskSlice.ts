import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Difficulty } from "../types/difficulty";

interface Task {
  id: number;
  title: string;
  level: Difficulty;
}

interface TaskState {
  tasks: Task[];
  completed: Task[];
}

const loadState = (): TaskState => {
  try {
    const state = localStorage.getItem("taskState");
    return state ? JSON.parse(state) : { tasks: [], completed: [] };
  } catch {
    return { tasks: [], completed: [] };
  }
};

const saveState = (state: TaskState) => {
  localStorage.setItem("taskState", JSON.stringify(state));
};

const initialState: TaskState = loadState();

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        level: Difficulty;
      }>
    ) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload.title,
        level: action.payload.level,
      });
      saveState(state);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.completed = state.completed.filter(
        (task) => task.id !== action.payload
      );
      saveState(state);
    },
    doneTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [completedTask] = state.tasks.splice(index, 1);
        state.completed.push(completedTask);
      }
      saveState(state);
    },
    undoTask: (state, action: PayloadAction<number>) => {
      const index = state.completed.findIndex(
        (task) => task.id === action.payload
      );
      if (index !== -1) {
        const task = state.completed[index];
        state.tasks.push(task);
        state.completed.splice(index, 1);
      }
      saveState(state);
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        level: Difficulty;
      }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.level = action.payload.level;
      }

      const completedTask = state.completed.find(
        (t) => t.id === action.payload.id
      );
      if (completedTask) {
        completedTask.title = action.payload.title;
        completedTask.level = action.payload.level;
      }

      saveState(state);
    },
    moveTask: (
      state,
      action: PayloadAction<{ taskId: number; newLevel: Difficulty }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.level = action.payload.newLevel;
      }
      saveState(state);
    },
  },
});

export const { addTask, removeTask, doneTask, undoTask, editTask, moveTask } =
  taskSlice.actions;
export default taskSlice.reducer;
