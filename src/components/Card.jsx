export default function Card({ item, deleteTask }) {
  return (
    <>
      <p className="mr-2 text-sm md:text-base truncate">{item.content}</p>
      <button
        type="button"
        className="w-6 h-6 text-zinc-400 hover:text-red-500 hover:bg-zinc-500 transition-colors duration-200 flex items-center justify-center rounded-full"
        onClick={() => deleteTask(item.id)}
      >
        x
      </button>
    </>
  );
}
