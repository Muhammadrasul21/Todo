import React from "react";
import { Card, Empty } from "antd";
import { undoTask } from "../../redux/taskSlice";
import { Difficulty, type TaskListProps } from "../../types/difficulty";
import TaskItem from "./TaskItem";

const Completed: React.FC<TaskListProps> = ({ tasks, dispatch }) => {
  const handleUndo = (id: number) => {
    dispatch(undoTask(id));
  };

  return (
    <Card
      title="Completed tasks"
      variant="borderless"
      style={{ width: "100%" }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        },
      }}
    >
      {tasks.length === 0 ? (
        <Empty description="Empty" />
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            dispatch={dispatch}
            defaultLevel={Difficulty.EASY}
            showDoneButton={false}
            showUndoButton={true}
            onUndo={handleUndo}
          />
        ))
      )}
    </Card>
  );
};

export default Completed;
