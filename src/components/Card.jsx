export default function Card({ item, deleteTask, theme }) {
  return (
    <>
      <p
        className={`mr-2 text-sm md:text-base truncate ${
          theme === "dark" ? "text-zinc-100" : "text-zinc-800"
        }`}
      >
        {item.content}
      </p>
      <button
        type="button"
        className={`w-6 h-6 transition-colors duration-200 flex items-center justify-center rounded-full ${
          theme === "dark"
            ? "text-zinc-300 hover:text-red-400 hover:bg-zinc-600"
            : "text-zinc-500 hover:text-red-500 hover:bg-zinc-200"
        }`}
        onClick={() => deleteTask(item.id)}
      >
        x
      </button>
    </>
  );
}
