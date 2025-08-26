export const Difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
