import React from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../component/Loading.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessage();

  if (loading) return <Loading />;

  return (
    <div style={{ minHeight: "calc(92vh - 8vh)" }}>
      {Array.isArray(messages) && messages.length === 0 ? (
        <p className="text-center mt-[20%]">Say! Hi</p>
      ) : (
        Array.isArray(messages) &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
    </div>
  );
};

export default Messages;
