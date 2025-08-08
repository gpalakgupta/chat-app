import React from "react";

const Message = ({ message }) => {
  const storedUser = localStorage.getItem("messange");
  const authuser = storedUser ? JSON.parse(storedUser) : null;

  // If no user info in storage, consider not "me"
  const itsme = authuser && message.senderId === authuser.user._id;

  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-blue-400" : "bg-gray-400";  

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message || "(empty message)"}
        </div>
      </div>
    </div>
  );
};

export default Message;
