import React, { useState } from "react";
import type { AppDispatch } from "../../redux/store";
import { doneTask, removeTask, editTask } from "../../redux/taskSlice";
import { Card, Select } from "antd";
import { CiEdit } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdFileDownloadDone, MdCancel } from "react-icons/md";
import { Difficulty } from "../../types/difficulty";

interface Task {
  id: number;
  title: string;
  level: string;
}

interface MediumProps {
  tasks: Task[];
  dispatch: AppDispatch;
}

const Medium: React.FC<MediumProps> = ({ tasks, dispatch }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLevel, setEditLevel] = useState<Difficulty>(Difficulty.MEDIUM);

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
      setEditLevel(Difficulty.MEDIUM);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
    setEditLevel(Difficulty.MEDIUM);
  };

  const handleLevelChange = (newLevel: Difficulty) => {
    setEditLevel(newLevel);
  };

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
        }
      }}
    >
      {mediumTasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>Empty</p>
      ) : (
        mediumTasks.map((task) => (
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
                <p className="flex-1">{task.title}</p>
                <button
                  className="bg-yellow-500 p-1 rounded-[8px] text-white"
                  onClick={() => startEdit(task.id, task.title, task.level as Difficulty)}
                >
                  <CiEdit className="w-5 h-5" />
                </button>
                <button
                  className="bg-green-500 p-1 rounded-[8px] text-white"
                  onClick={() => dispatch(doneTask(task.id))}
                >
                  <IoMdDoneAll className="w-5 h-5" />
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

export default Medium;
