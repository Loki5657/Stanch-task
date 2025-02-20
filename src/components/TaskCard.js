import { useDrag } from "react-dnd";
import { useState } from "react";
import TaskForm from "./TaskForm"; // Import TaskForm component

const TaskCard = ({ task, onDelete }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        ref={drag}
        className={`p-4 border rounded mb-2 bg-white shadow-md cursor-move ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <div className="flex justify-between mt-2">
          <span
            className={`px-2 py-1 text-xs rounded ${
              task.priority === "High" ? "bg-red-500 text-white" : "bg-gray-300"
            }`}
          >
            {task.priority}
          </span>
          <div>
            <button
              className="text-blue-500 mr-2"
              onClick={() => setIsModalOpen(true)} 
            >
              Edit
            </button>
            <button className="text-red-500" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskForm initialData={task} closeModal={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default TaskCard;
