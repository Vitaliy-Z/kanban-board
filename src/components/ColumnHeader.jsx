import React from "react";

const columnStyle = {
  todo: "bg-gradient-to-r from-blue-600 to-blue-400",
  inprogress: "bg-gradient-to-r from-yellow-600 to-yellow-400",
  done: "bg-gradient-to-r from-green-600 to-green-400"
};

export default function ColumnHeader({ tasks }) {
  const columnName = tasks.name.toLowerCase().split(" ").join("");

  return (
    <div
      className={`p-3 flex items-center rounded-t-md ${columnStyle[columnName]}`}
    >
      <p className="text-white font-bold text-sm md:text-base uppercase">
        {tasks.name}
      </p>
      <span className="ml-3 px-3 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-xs md:text-sm">
        {tasks.items.length}
      </span>
    </div>
  );
}
