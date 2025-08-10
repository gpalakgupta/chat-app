import React from "react";

const Message = ({ message }) => {
const storedUser = localStorage.getItem("messanger");
const authuser = storedUser ? JSON.parse(storedUser) : null;
console.log("Auth user object:", authuser);

const itsme = authuser?.user?._id === message.senderId;

// console.log("Sender ID from message:", message.senderId);
// console.log("My user ID:", authuser?._id);
// console.log(
//   "Match?",
//   String(message.senderId) === String(authuser?._id)
// );


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
