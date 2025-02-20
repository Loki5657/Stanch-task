import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const SearchFilter = () => {
  const { tasks } = useTasks();
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mb-4">
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="p-2 border rounded w-full"
      />
      <div>
        {search && filteredTasks.map(task => <p key={task.id}>{task.title}</p>)}
      </div>
    </div>
  );
};

export default SearchFilter;