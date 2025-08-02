import React from "react";
import Users from "./Users";

const User = () => {
  return (
    <div className="flex space-x-4 px-8 py-4 hover:bg-slate-600 duration-300 cursor-pointer rounded-lg items-center">
      <div className="avatar avatar-online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div>
        <h1 className="font-bold">Palak Gupta</h1>
        <span>Palak@gmail.com</span>
      </div>
    </div>
  );
};

export default User;
