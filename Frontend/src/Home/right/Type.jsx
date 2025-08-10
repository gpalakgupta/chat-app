import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../context/useSendMessage.js";
const Type = () => {
  const [text, setText] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSend = () => {
    if (text.trim()) {
      sendMessages(text);
      setText(""); // input clear after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex space-x-3 h-[8vh] items-center">
      <input
        type="text"
        placeholder="Type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={loading}
        className="border-[1px] border-gray-700 bg-slate-900 px-4 py-2 rounded-xl w-full outline-none"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="text-3xl disabled:opacity-50"
      >
        <IoMdSend />
      </button>
    </div>
  );
};

export default Type;
