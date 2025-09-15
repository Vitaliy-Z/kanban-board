import { useState } from "react";

export default function AddInput({ addingTask, tasks, theme }) {
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
    <div className="mb-6 md:mb-8 flex w-full max-w-xl md:max-w-2xl shadow-lg rounded-lg overflow-hidden flex-col sm:flex-row">
      <input
        type="text"
        className={`flex-grow p-3 outline-none w-full ${
          theme === "dark"
            ? "bg-zinc-700 text-zinc-100 placeholder-zinc-400"
            : "bg-white text-zinc-800 placeholder-zinc-500"
        }`}
        value={newTaskContent}
        onChange={(e) => {
          setNewTaskContent(e.target.value.trim());
        }}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        placeholder="Add a new task"
      />
      <select
        className={`p-2 border-0 border-t sm:border-t-0 sm:border-l border-zinc-500 outline-none w-full sm:w-auto ${
          theme === "dark"
            ? "bg-zinc-700 text-zinc-100"
            : "bg-white text-zinc-800"
        }`}
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
        className="px-6 py-3 sm:py-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium hover:from-yellow-600 transition-all duration-200 w-full sm:w-auto"
        onClick={handleAddTask}
      >
        Add
      </button>
    </div>
  );
}
