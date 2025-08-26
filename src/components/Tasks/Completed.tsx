import React, { useState } from "react";
import type { AppDispatch } from "../../redux/store";
import { removeTask, undoTask, editTask } from "../../redux/taskSlice";
import { Card, Empty, Select } from "antd";
import { CiEdit } from "react-icons/ci";
import { FaUndo } from "react-icons/fa";
import { MdDeleteForever, MdFileDownloadDone, MdCancel } from "react-icons/md";
import { Difficulty } from "../../types/difficulty";

interface Task {
  id: number;
  title: string;
  level: string;
}

interface CompletedProps {
  tasks: Task[];
  dispatch: AppDispatch;
}

const Completed: React.FC<CompletedProps> = ({ tasks, dispatch }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLevel, setEditLevel] = useState<Difficulty>(Difficulty.EASY);

  const startEdit = (id: number, currentTitle: string, currentLevel: Difficulty) => {
    setEditId(id);
    setEditValue(currentTitle);
    setEditLevel(currentLevel);
  };

  const saveEdit = () => {
    if (editValue.trim() && editId !== null) {
      dispatch(editTask({ id: editId, title: editValue, level: editLevel }));
      setEditId(null);
      setEditValue("");
      setEditLevel(Difficulty.EASY);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
    setEditLevel(Difficulty.EASY);
  };

  const handleLevelChange = (newLevel: Difficulty) => {
    setEditLevel(newLevel);
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
          gap: "10px"
        }
      }}
    >
      {tasks.length === 0 ? (
        <Empty description="Empty" />
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            style={{ width: "100%" }}
            styles={{
              body: {
                display: "flex",
                gap: "10px",
                alignItems: "center",
                padding: "6px",
              }
            }}
          >
            {editId === task.id ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border p-1 rounded w-full"
                  placeholder="Task title"
                />
                <div className="flex gap-2">
                  <Select
                    value={editLevel}
                    onChange={handleLevelChange}
                    style={{ width: 100 }}
                    options={[
                      { value: Difficulty.EASY, label: "Easy" },
                      { value: Difficulty.MEDIUM, label: "Medium" },
                      { value: Difficulty.HIGH, label: "High" },
                    ]}
                  />
                  <button
                    className="bg-green-500 p-1 rounded-[8px] text-white"
                    onClick={saveEdit}
                  >
                    <MdFileDownloadDone className="w-5 h-5" />
                  </button>
                  <button
                    className="bg-gray-400 p-1 rounded-[8px] text-white"
                    onClick={cancelEdit}
                  >
                    <MdCancel className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="flex-1">
                  {task.title} ({task.level})
                </p>
                <button
                  className="bg-yellow-500 p-1 rounded-[8px] text-white"
                  onClick={() => startEdit(task.id, task.title, task.level as Difficulty)}
                >
                  <CiEdit className="w-5 h-5" />
                </button>
                <button
                  className="bg-blue-500 p-1 rounded-[8px] text-white"
                  onClick={() => dispatch(undoTask(task.id))}
                >
                  <FaUndo className="w-5 h-5" />
                </button>
                <button
                  className="bg-red-500 p-1 rounded-[8px] text-white"
                  onClick={() => dispatch(removeTask(task.id))}
                >
                  <MdDeleteForever className="w-5 h-5" />
                </button>
              </>
            )}
          </Card>
        ))
      )}
    </Card>
  );
};

export default Completed;
