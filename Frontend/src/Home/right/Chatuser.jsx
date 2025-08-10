import React from "react";
import useConversation from "../../stateManage/useConversation.js";
import { useSocketContext } from "../../context/socketContext.jsx";

const Chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div className="pl-5 pt-5 pb-3 h-[8vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 items-center">
      <div
        className={`avatar ${
          getOnlineUserStatus(selectedConversation?._id)
            ? "avatar-online"
            : "avatar-offline"
        }`}
      >
        <div className="w-14 rounded-full">
          <img
            src={
              selectedConversation?.profilePic ||
              "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            }
            alt={selectedConversation?.name || "User avatar"}
          />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">
          {selectedConversation?.name || "Select a user"}
        </h1>
        <span
          className={`text-sm ${
            getOnlineUserStatus(selectedConversation?._id)
              ? "text-green-400"
              : "text-gray-400"
          }`}
        >
          {getOnlineUserStatus(selectedConversation?._id)
            ? "Online"
            : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default Chatuser;
