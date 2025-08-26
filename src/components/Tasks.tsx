import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import Easy from "./Tasks/Easy";
import Medium from "./Tasks/Medium";
import High from "./Tasks/High";
import Completed from "./Tasks/Completed";

const Tasks = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const completedTasks = useSelector(
    (state: RootState) => state.task.completed
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 w-[50%]">
        <Easy tasks={tasks} dispatch={dispatch} />
        <Medium tasks={tasks} dispatch={dispatch} />
        <High tasks={tasks} dispatch={dispatch} />
      </div>

      <div className="w-[50%]">
        <Completed tasks={completedTasks} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Tasks;
