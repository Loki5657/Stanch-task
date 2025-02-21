
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  doc, 
  query, 
  orderBy, 
  getDoc 
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("All Priorities"); // Default to "All Priorities"
  const { user } = useAuth();

// based on priority filter the task
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      let taskData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (priorityFilter !== "All") {
        taskData = taskData.filter(task => task.priority === priorityFilter);
      }
      setTasks(taskData);
    });
    return () => unsubscribe();
  }, [priorityFilter]);
  useEffect(() => {
    const logsQuery = query(collection(db, "activity_logs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
      const logData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLogs(logData);
    });

    return () => unsubscribe();
  }, []);

  const logActivity = async (action, task, details = "") => {
    if (!user) return;

    const logEntry = {
      action,
      taskTitle: task?.title || "Unknown Task",
      taskId: task?.id || null,
      details, 
      user: user.email,
      timestamp: new Date().toISOString(),
    };
    await addDoc(collection(db, "activity_logs"), logEntry);
  };

  const addTask = async (task) => {
    try {
      const newTask = { 
        ...task, 
        status: task.status || "To Do",
        priority: task.priority || "Medium" 
      };
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      await logActivity("Created Task", { id: docRef.id, ...newTask });
      return { id: docRef.id, ...newTask };
    } catch (error) {
      console.error("Firestore Error:", error.message);
    }
  };
  const updateTask = async (id, updatedTask) => {
    const taskRef = doc(db, "tasks", id);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) return;
    
    const oldTask = taskSnap.data();
    await updateDoc(taskRef, updatedTask);
    if(oldTask?.status !=updatedTask?.status){
      await logActivity(
        "Changed Status",
        `Status changed from ${oldTask.Status} to ${updatedTask.Status}`
      );
    } else if (oldTask.priority !== updatedTask.priority) {
      await logActivity(
        "Changed Priority",
        { id, title: oldTask.title },
        `Priority changed from ${oldTask.priority} to ${updatedTask.priority}`
      );
    } else {
      await logActivity("Updated Task", { id, ...updatedTask });
    }

    setTasks(prevTasks =>
      prevTasks.map(task => task.id === id ? { ...task, ...updatedTask } : task)
    );
  };

  const deleteTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    await deleteDoc(doc(db, "tasks", id));
    await logActivity("Deleted Task", taskToDelete, `Task "${taskToDelete.title}" was removed`);

    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      logs, 
      priorityFilter, 
      setPriorityFilter, 
      addTask, 
      updateTask, 
      deleteTask 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
