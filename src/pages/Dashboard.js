import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import SearchFilter from "../components/SearchFilter";
import TaskForm from "../components/TaskForm"; 
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import ActivityLog from "../components/ActivityLog";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks } = useTasks();
  const isGuest = sessionStorage.getItem("guest");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 

  const openModal = (task = null) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.displayName || "Guest"}
        </h1>
        <button 
          onClick={() => openModal()} 
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Create New Ticket
        </button>
        <button 
          onClick={logout} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded mb-4">
          Logout
        </button>
      </div>
      
        {/* <button 
          onClick={logout} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded mb-4">
          Logout
        </button> */}

      <SearchFilter />
      
      {/* {tasks.length > 0 ? ( */}
        <KanbanBoard openModal={openModal} />
      {/* ) : (
        <p className="text-gray-500 text-center">No tasks available</p>
      )} */}

      {/* TaskForm Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTask ? "Edit Task" : "Create Task"}
            </h2>
            <TaskForm initialData={selectedTask} closeModal={() => setShowTaskModal(false)} />
            <button
              onClick={() => setShowTaskModal(false)}
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded w-full">
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full mt-20">
        <ActivityLog />
      </div>
    </div>
  );
};

export default Dashboard;


