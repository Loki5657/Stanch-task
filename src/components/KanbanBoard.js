
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

const KanbanBoard = () => {
  const { tasks, updateTask, deleteTask, priorityFilter, setPriorityFilter } = useTasks();

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
        {tasks?.filter(task => task.status === status).map(task => <TaskCard key={task.id} task={task} onDelete={deleteTask} />)}
      </div>
    );
  };

  return (
    <>
      <div>
        {/* Priority Filter Dropdown */}
        <select
          className="mt-2 p-2 border rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

      </div>
      <div className="flex">
        <Column status="To Do" />
        <Column status="In Progress" />
        <Column status="Done" />
      </div>
    </>
  );
};

export default KanbanBoard;
