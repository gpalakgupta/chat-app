import React from "react";
import useConversation from "../../stateManage/useConversation.js";
import { useSocketContext } from "../../context/socketContext.jsx";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();

   
  const isOnline = onlineUsers.includes(user._id);

  console.log("onlineUsers:", onlineUsers);
  console.log("current user id:", user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-4 cursor-pointer rounded-lg items-center">
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              className="rounded-full object-cover"
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt={user.name}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
