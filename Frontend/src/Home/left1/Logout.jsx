import React from "react";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button>
          <BiLogOut className="text-4xl p-2 hover:bg-gray-600 rounded-lg duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Logout;
