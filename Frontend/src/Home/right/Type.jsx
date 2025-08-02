import React from "react";
import { IoMdSend } from "react-icons/io";

const Type = () => {
  return (
    <div className="flex space-x-3 h-[8vh] items-center">
      <input
        type="text"
        placeholder="Type here"
        className="border-[1px] border-gray-700 bg-slate-900 px-4 py-2 rounded-xl w-full outline-none"
      />
      <button className="text-3xl ">
        <IoMdSend />
      </button>
    </div>
  );
};

export default Type;
