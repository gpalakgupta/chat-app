import React from "react";

const Chatuser = () => {
  return (
    <div className="pl-5 pt-5 pb-3 h-[8vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 items-center">
      <div className="avatar avatar-online">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Palak Gupta</h1>
        <span className="text-sm text-green-400">Online</span>
      </div>
    </div>
  );
};

export default Chatuser;