import React from "react";
import { Card } from "antd";
import { Difficulty, type TaskListProps } from "../../types/difficulty";
import TaskItem from "./TaskItem";

const High: React.FC<TaskListProps> = ({ tasks, dispatch }) => {
  const highTasks = tasks.filter((task) => task.level === Difficulty.HIGH);

  return (
    <Card
      title="High Tasks"
      style={{ width: "100%" }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        },
      }}
    >
      {highTasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>Empty</p>
      ) : (
        highTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            dispatch={dispatch}
            defaultLevel={Difficulty.HIGH}
            showDoneButton={true}
          />
        ))
      )}
    </Card>
  );
};

export default High;
