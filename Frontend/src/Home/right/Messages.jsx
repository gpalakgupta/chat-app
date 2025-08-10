import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../component/Loading.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) return <Loading />;

  return (
    <div
      style={{ minHeight: "calc(92vh - 8vh)" }}
      className="overflow-y-auto"
    >
      {Array.isArray(messages) && messages.length === 0 ? (
        <p className="text-center mt-[20%]">Say! Hi</p>
      ) : (
        Array.isArray(messages) &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null} // attach ref to last message
          >
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
