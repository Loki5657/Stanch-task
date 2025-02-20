
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc, getDoc } from "firebase/firestore";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("🔥 Firestore Snapshot:", taskData); // Debugging
      setTasks(taskData);
    });
  
    return () => unsubscribe();
  }, []);
  

  const addTask = async (task) => {
    try {
      console.log("Inside addTask function with task:", task);
  
      const newTask = { 
        ...task, 
        status: task.status || "To Do"
      };
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      console.log("Task added successfully with ID:", docRef.id);
      return { id: docRef.id, ...newTask };
    } catch (error) {
      console.error("Firestore Error:", error.message);
    }
  };
  const updateTask = async (id, updatedTask) => {
    await updateDoc(doc(db, "tasks", id), updatedTask);
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

