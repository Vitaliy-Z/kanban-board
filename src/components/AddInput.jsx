import { useState } from "react";

export default function AddInput({ addingTask, tasks }) {
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");

  const handleAddTask = () => {
    if (newTaskContent.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      content: newTaskContent
    };

    addingTask(newTask, activeColumn);
    setNewTaskContent("");
  };

  return (
    <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
      <input
        type="text"
        className="flex-grow p-3 bg-zinc-600 text-white outline-none"
        value={newTaskContent}
        onChange={(e) => {
          setNewTaskContent(e.target.value.trim());
        }}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        placeholder="Add a new task"
      />
      <select
        className="p-2 bg-zinc-600 text-white border-0 border-l border-zinc-500 outline-none"
        value={activeColumn}
        onChange={(e) => setActiveColumn(e.target.value)}
      >
        {Object.keys(tasks).map((columnId) => (
          <option value={columnId} key={columnId}>
            {tasks[columnId].name}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="px-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium hover:from-yellow-600 transition-all duration-200"
        onClick={handleAddTask}
      >
        Add
      </button>
    </div>
  );
}
