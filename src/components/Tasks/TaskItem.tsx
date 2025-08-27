import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Select } from "antd";
import { doneTask, removeTask, editTask } from "../../redux/taskSlice";
import { Difficulty, type TaskItemProps } from "../../types/difficulty";
import { CiEdit } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import { FaUndo } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDeleteForever, MdFileDownloadDone, MdCancel } from "react-icons/md";

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  dispatch,
  defaultLevel,
  showDoneButton = true,
  showUndoButton = false,
  onUndo,
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLevel, setEditLevel] = useState<Difficulty>(defaultLevel);

  const startEdit = (
    id: number,
    currentTitle: string,
    currentLevel: Difficulty
  ) => {
    setEditId(id);
    setEditValue(currentTitle);
    setEditLevel(currentLevel);
  };

  const saveEdit = () => {
    if (editValue.trim() && editId !== null) {
      dispatch(editTask({ id: editId, title: editValue, level: editLevel }));
      setEditId(null);
      setEditValue("");
      setEditLevel(defaultLevel);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
    setEditLevel(defaultLevel);
  };

  const handleLevelChange = (newLevel: Difficulty) => {
    setEditLevel(newLevel);
  };

  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1,
          }}
        >
          <Card
            style={{ width: "100%" }}
            styles={{
              body: {
                display: "flex",
                gap: "10px",
                alignItems: "center",
                padding: "6px",
              },
            }}
          >
            <div {...provided.dragHandleProps} className="cursor-grab">
              <RxHamburgerMenu className="w-4 h-4 text-gray-400" />
            </div>

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
                  {task.title}
                  {task.level !== defaultLevel && ` (${task.level})`}
                </p>
                <button
                  className="bg-yellow-500 p-1 rounded-[8px] text-white"
                  onClick={() => startEdit(task.id, task.title, task.level)}
                >
                  <CiEdit className="w-5 h-5" />
                </button>

                {showDoneButton && (
                  <button
                    className="bg-green-500 p-1 rounded-[8px] text-white"
                    onClick={() => dispatch(doneTask(task.id))}
                  >
                    <IoMdDoneAll className="w-5 h-5" />
                  </button>
                )}

                {showUndoButton && onUndo && (
                  <button
                    className="bg-blue-500 p-1 rounded-[8px] text-white"
                    onClick={() => onUndo(task.id)}
                  >
                    <FaUndo className="w-5 h-5" />
                  </button>
                )}

                <button
                  className="bg-red-500 p-1 rounded-[8px] text-white"
                  onClick={() => dispatch(removeTask(task.id))}
                >
                  <MdDeleteForever className="w-5 h-5" />
                </button>
              </>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
