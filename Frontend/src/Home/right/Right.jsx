import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";

const Right = () => {
  return (
    <div className="w-full bg-black text-white">
      <Chatuser />
      <div className="py-2 flex-palak overflow-y-auto" style={{ maxHeight: "calc(92vh - 8vh)" }}>
        <Messages />
      </div>
      <Type />
    </div>
  );
};

export default Right;
