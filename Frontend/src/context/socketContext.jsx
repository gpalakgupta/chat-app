import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./Authprovider";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (!authUser || !authUser.user || !authUser.user._id) return;

    const newSocket = io("http://localhost:3000", {
      query: { userId: authUser.user._id },
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("getOnline", (users) => {
      // console.log("Online users from backend:", users);
      setOnlineUsers(users);
    });

    return () => {
      newSocket.close();
    };
  }, [authUser?.user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
