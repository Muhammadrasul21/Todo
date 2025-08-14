import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { doneTask, removeTask, undoTask, editTask } from "../redux/taskSlice";
import { MdDeleteForever } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { FaUndo } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdFileDownloadDone } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { Card, Empty } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Tasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const completedTasks = useSelector(
    (state: RootState) => state.task.completed
  );
  const dispatch = useDispatch<AppDispatch>();

  const levels: ("easy tasks" | "medium tasks" | "high tasks")[] = [
    "easy tasks",
    "medium tasks",
    "high tasks",
  ];

  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (id: number, currentTitle: string) => {
    setEditId(id);
    setEditValue(currentTitle);
  };

  const saveEdit = (id: number) => {
    if (editValue.trim()) {
      dispatch(editTask({ id, title: editValue }));
      setEditId(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-[50%]">
        {levels.map((level) => {
          const filteredTasks = tasks.filter(
            (task) => task.level === level.replace(" tasks", "")
          );
          return (
            <Card
              key={level}
              title={level.charAt(0).toUpperCase() + level.slice(1)}
              style={{ width: "full" }}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {filteredTasks.length === 0 ? (
                <div style={{ textAlign: "center" }}>
                  <SmileOutlined style={{ fontSize: 20 }} />
                  <p>Empty</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    style={{ width: "100%" }}
                    bodyStyle={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      padding: "6px",
                    }}
                  >
                    {editId === task.id ? (
                      <>
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border p-1 rounded flex-1"
                        />
                        <button
                          className="bg-green-500 p-1 rounded-[8px] text-white"
                          onClick={() => saveEdit(task.id)}
                        >
                          <MdFileDownloadDone className="w-5 h-5" />
                        </button>
                        <button
                          className="bg-gray-400 p-1 rounded-[8px] text-white"
                          onClick={cancelEdit}
                        >
                          <MdCancel className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="flex-1">{task.title}</p>
                        <button
                          className="bg-yellow-500 p-1 rounded-[8px] text-white"
                          onClick={() => startEdit(task.id, task.title)}
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
        })}
      </div>

      {/* Completed tasks card */}
      <Card
        title="Completed tasks"
        variant="borderless"
        style={{ width: "50%" }}
        bodyStyle={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {completedTasks.length === 0 ? (
          <Empty description="Empty" />
        ) : (
          completedTasks.map((task) => (
            <Card
              key={task.id}
              style={{ width: "100%" }}
              bodyStyle={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                padding: "6px",
              }}
            >
              {editId === task.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                  <button
                    className="bg-green-500 p-1 rounded-[8px] text-white"
                    onClick={() => saveEdit(task.id)}
                  >
                    <MdFileDownloadDone className="w-5 h-5" />
                  </button>
                  <button
                    className="bg-gray-400 p-1 rounded-[8px] text-white"
                    onClick={cancelEdit}
                  >
                    <MdCancel className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <p className="flex-1">
                    {task.title} ({task.level})
                  </p>
                  <button
                    className="bg-yellow-500 p-1 rounded-[8px] text-white"
                    onClick={() => startEdit(task.id, task.title)}
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
    </div>
  );
};

export default Tasks;
