import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import type { AppDispatch } from "../redux/store";
import { Checkbox, Button, Input, Typography } from "antd";
import { Difficulty } from "../types/difficulty";

const { Text } = Typography;

const Header: React.FC = () => {
  const [value, setValue] = useState("");
  const [select, setSelect] = useState<Difficulty | null>(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = (level: Difficulty) => {
    setSelect(select === level ? null : level);
    setError("");
  };

  const handleAddTask = () => {
    if (!value.trim()) {
      setError("Enter a task!");
      return;
    }
    if (!select) {
      setError("Choose the difficulty!");
      return;
    }

    dispatch(addTask({ title: value, level: select }));
    setValue("");
    setSelect(null);
    setError("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-10">
        <Input
          placeholder="Enter a task"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          type="text"
        />

        <div className="flex gap-4 items-center">
          {Object.values(Difficulty).map((lvl) => (
            <Checkbox
              key={lvl}
              checked={select === lvl}
              onChange={() => handleCheckboxChange(lvl)}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </Checkbox>
          ))}
        </div>

        <Button type="primary" onClick={handleAddTask}>
          Submit
        </Button>
      </div>

      {error && <Text type="danger">{error}</Text>}
    </div>
  );
};

export default Header;
