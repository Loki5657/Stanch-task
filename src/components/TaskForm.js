

import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ initialData = {}, closeModal }) => {
  const { addTask, updateTask } = useTasks();
  const navigate = useNavigate();

  // Ensure initialData is not null or undefined
  const safeInitialData = initialData || {};
  const [task, setTask] = useState({
    title: safeInitialData.title || "",
    description: safeInitialData.description || "",
    priority: safeInitialData.priority || "Medium",
    status: safeInitialData.status || "To Do"
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) return alert("Title is required!");

    if (safeInitialData.id) {
      await updateTask(safeInitialData.id, task);
    } else {
      await addTask(task);
    }

    closeModal ? closeModal() : navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {safeInitialData.id ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Task Title"
            required
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Task Description"
          ></textarea>

          {/* Priority Dropdown */}
          <label className="block mb-2">Priority:</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => (closeModal ? closeModal() : navigate("/"))}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
