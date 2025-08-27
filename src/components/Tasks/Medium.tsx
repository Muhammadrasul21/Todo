import React from "react";
import { Card } from "antd";
import { Difficulty, type TaskListProps } from "../../types/difficulty";
import TaskItem from "./TaskItem";

const Medium: React.FC<TaskListProps> = ({ tasks, dispatch }) => {
  const mediumTasks = tasks.filter((task) => task.level === Difficulty.MEDIUM);

  return (
    <Card
      title="Medium Tasks"
      style={{ width: "100%" }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        },
      }}
    >
      {mediumTasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>Empty</p>
      ) : (
        mediumTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            dispatch={dispatch}
            defaultLevel={Difficulty.MEDIUM}
            showDoneButton={true}
          />
        ))
      )}
    </Card>
  );
};

export default Medium;
