import { useSelector, useDispatch } from "react-redux";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { RootState, AppDispatch } from "../redux/store";
import { moveTask } from "../redux/taskSlice";
import type { Difficulty } from "../types/difficulty";
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const newLevel = destination.droppableId as Difficulty;
      dispatch(
        moveTask({
          taskId: Number(draggableId),
          newLevel: newLevel,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-8">
        <div className="flex flex-col gap-4 w-[50%]">
          <Droppable droppableId="easy">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Easy tasks={tasks} dispatch={dispatch} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="medium">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Medium tasks={tasks} dispatch={dispatch} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="high">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <High tasks={tasks} dispatch={dispatch} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="w-[50%]">
          <Droppable droppableId="completed">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Completed tasks={completedTasks} dispatch={dispatch} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Tasks;
