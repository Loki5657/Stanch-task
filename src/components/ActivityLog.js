import { useTasks } from "../context/TaskContext";

const ActivityLog = () => {
  const { logs } = useTasks();

  return (
    <div className="p-4 border rounded bg-gray-50 w-full">
      <h2 className="text-xl font-bold mb-3">Activity Log</h2>
      <ul className="max-h-60 overflow-y-auto">
        {logs.length === 0 ? (
          <p>No activity recorded yet.</p>
        ) : (
          logs?.map((log) => {
            return(
            <li key={log.id} className="p-2 border-b text-sm">
              <span className="font-semibold">{log.user}</span> {log.action} <strong>{log.taskTitle}</strong> 
              <span className="text-gray-500"> ({new Date(log.timestamp).toLocaleString()})</span>
            </li>
          )})
        )}
      </ul>
    </div>
  );
};

export default ActivityLog;
