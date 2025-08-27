import React from "react";
import { Card } from "antd";
import { Difficulty, type TaskListProps } from "../../types/difficulty";
import TaskItem from "./TaskItem";

const Easy: React.FC<TaskListProps> = ({ tasks, dispatch }) => {
  const easyTasks = tasks.filter((task) => task.level === Difficulty.EASY);

  return (
    <Card
      title="Easy Tasks"
      style={{ width: "100%" }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        },
      }}
    >
      {easyTasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>Empty</p>
      ) : (
        easyTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            dispatch={dispatch}
            defaultLevel={Difficulty.EASY}
            showDoneButton={true}
          />
        ))
      )}
    </Card>
  );
};

export default Easy;
