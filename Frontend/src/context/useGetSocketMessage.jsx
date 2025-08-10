import React, { useEffect } from "react";
import { useSocketContext } from "./socketContext.jsx";
import useConversation from "../stateManage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, setMessages]);
};

export default useGetSocketMessage;
