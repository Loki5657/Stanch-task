
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

const KanbanBoard = () => {
  const { tasks, updateTask,deleteTask } = useTasks();

  const moveTask = (id, status) => {
    updateTask(id, { status });
  };

  const Column = ({ status }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "TASK",
      drop: (item) => moveTask(item.id, status),
      collect: (monitor) => ({ isOver: !!monitor.isOver() })
    }));

    return (
      <div ref={drop} className={`p-4 w-1/3 ${isOver ? "bg-gray-200" : "bg-gray-100"}`}>
        <h2 className="text-xl font-bold">{status}</h2>
        {tasks?.filter(task => task.status === status).map(task => <TaskCard key={task.id} task={task} onDelete={deleteTask}/>)}
      </div>
    );
  };

  return (
    <div className="flex">
      <Column status="To Do" />
      <Column status="In Progress" />
      <Column status="Done" />
    </div>
  );
};

export default KanbanBoard;
