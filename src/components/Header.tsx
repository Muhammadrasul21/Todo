import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import type { AppDispatch } from "../redux/store";
import { Checkbox, Button, Input } from "antd";

const Header: React.FC = () => {
  const [value, setValue] = useState("");
  const [select, setSelect] = useState<"easy" | "medium" | "high" | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = (level: "easy" | "medium" | "high") => {
    setSelect(select === level ? null : level);
  };

  const handleAddTask = () => {
    if (!value.trim() || !select) return;

    dispatch(addTask({ title: value, level: select }));
    setValue("");
    setSelect(null);
  };

  return (
    <div className="flex items-center gap-10">
      <Input
        placeholder="Enter a task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />

      <div className="flex gap-4 items-center">
        {["easy", "medium", "high"].map((lvl) => (
          <Checkbox
            key={lvl}
            checked={select === lvl}
            onChange={() =>
              handleCheckboxChange(lvl as "easy" | "medium" | "high")
            }
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </Checkbox>
        ))}
      </div>

      <Button type="primary" onClick={handleAddTask}>
        Submit
      </Button>
    </div>
  );
};

export default Header;
