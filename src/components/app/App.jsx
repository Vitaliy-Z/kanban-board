import { useState } from "react";

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

const colummnStyle = {
  todo: {
    header: "bg-gradient-to-r from-blue-600 to-blue-400"
  },
  inProgress: {
    header: "bg-gradient-to-r from-yellow-600 to-yellow-400"
  },
  done: {
    header: "bg-gradient-to-r from-green-600 to-green-400"
  }
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [draggingTask, setDraggingTask] = useState(null);

  const addTask = () => {
    if (newTaskContent.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      content: newTaskContent
    };
    const updatedTasks = { ...tasks };
    updatedTasks[activeColumn].items.push(newTask);

    setTasks(updatedTasks);
    setNewTaskContent("");
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
    <div className="p-6 min-w-screen min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-700 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-6">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-400">
          Kanban Board
        </h1>

        <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            className="flex-grow p-3 bg-zinc-600 text-white outline-none"
            value={newTaskContent}
            onChange={(e) => {
              setNewTaskContent(e.target.value.trim());
            }}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
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
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 w-full">
          {Object.keys(tasks).map((columnId) => (
            <div
              key={columnId}
              className={`flex-shrink-0 w-80 bg-zinc-800 rounded-lg shadow-xl`}
              onDragOver={(e) => {
                handleDragOver(e);
              }}
              onDrop={(e) => {
                handleDrop(e, columnId);
              }}
            >
              <div
                className={`p-3 flex items-center rounded-t-md ${colummnStyle[columnId].header}`}
              >
                <p className="text-white font-bold text-l uppercase">
                  {tasks[columnId].name}
                </p>
                <span className="ml-3 px-3 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm">
                  {tasks[columnId].items.length}
                </span>
              </div>

              <div className="p-3 min-h-65">
                {tasks[columnId].items.length === 0 ? (
                  <p className="text-center">Drop task hear</p>
                ) : (
                  tasks[columnId].items.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 mb-3 bg-zinc-700 rounded-lg shadow-md cursor-move flex items-center justify-between transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      draggable
                      onDragStart={() => handleDragStart(columnId, item)}
                    >
                      <p className="mr-2">{item.content}</p>
                      <button
                        type="button"
                        className="w-6 h-6 text-zinc-400 hover:text-red-500 hover:bg-zinc-500 transition-colors duration-200 flex items-center justify-center rounded-full"
                        onClick={() => removeTask(columnId, item.id)}
                      >
                        x
                      </button>
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
