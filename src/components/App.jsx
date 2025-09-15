import { useState, useEffect } from "react";
import AddInput from "./AddInput";
import ColumnHeader from "./ColumnHeader";
import Card from "./Card";

const initialTasks = {
  todo: {
    name: "To do",
    items: [
      {
        id: 1,
        content: "Write project"
      },
      {
        id: 2,
        content: "Set up repository"
      }
    ]
  },
  inProgress: {
    name: "In Progress",
    items: [
      {
        id: 3,
        content: "Design UI mockups"
      }
    ]
  },
  done: {
    name: "Done",
    items: []
  }
};

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("kanbanTasks");
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("kanbanTheme");
      if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  const [draggingTask, setDraggingTask] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
    } catch {
      // ignore write errors
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem("kanbanTheme", theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const onAddTask = (newTask, activeColumn) => {
    const updatedTasks = { ...tasks };
    updatedTasks[activeColumn].items.push(newTask);

    setTasks(updatedTasks);
  };

  const removeTask = (columId, taskId) => {
    const updatedTasks = { ...tasks };

    updatedTasks[columId].items = updatedTasks[columId].items.filter(
      (task) => task.id !== taskId
    );

    setTasks(updatedTasks);
  };

  const handleDragStart = (columId, item) => {
    setDraggingTask({ columId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnID) => {
    e.preventDefault();

    if (!draggingTask) return;

    const { columId: sourceColumnId, item } = draggingTask;

    if (sourceColumnId === columnID) return;

    removeTask(sourceColumnId, item.id);

    const updatedTasks = { ...tasks };
    updatedTasks[columnID].items.push(item);

    setTasks(updatedTasks);

    setDraggingTask(null);
  };

  return (
    <div
      className={`p-4 md:p-6 min-w-screen min-h-screen bg-gradient-to-b ${
        theme === "dark"
          ? "from-zinc-800 to-zinc-700"
          : "from-zinc-100 to-zinc-200"
      } flex items-start md:items-center justify-center`}
    >
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-4 md:gap-6 relative">
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className={`fixed top-4 right-4 z-10 rounded-md px-3 py-2 shadow-md transition-colors ${
            theme === "dark"
              ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              : "bg-white text-zinc-800 hover:bg-zinc-100"
          }`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <h1 className="mt-15 md:mt-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-400 text-center px-4">
          Kanban Board
        </h1>

        <AddInput addingTask={onAddTask} tasks={tasks} theme={theme} />

        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:overflow-x-auto overflow-visible pb-4 md:pb-6 w-full">
          {Object.keys(tasks).map((columnId) => (
            <div
              key={columnId}
              className={`flex-shrink-0 w-full md:w-80 ${
                theme === "dark" ? "bg-zinc-800" : "bg-white"
              } rounded-lg shadow-xl`}
              onDragOver={(e) => {
                handleDragOver(e);
              }}
              onDrop={(e) => {
                handleDrop(e, columnId);
              }}
            >
              <ColumnHeader columnId={columnId} tasks={tasks[columnId]} />

              <div className="p-3 min-h-65">
                {tasks[columnId].items.length === 0 ? (
                  <p className="text-center">Drop task hear</p>
                ) : (
                  tasks[columnId].items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 mb-3 rounded-lg shadow-md cursor-move flex items-center justify-between transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        theme === "dark" ? "bg-zinc-700" : "bg-zinc-100"
                      }`}
                      draggable
                      onDragStart={() => handleDragStart(columnId, item)}
                    >
                      <Card
                        item={item}
                        theme={theme}
                        deleteTask={(itemId) => removeTask(columnId, itemId)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
