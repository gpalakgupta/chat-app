import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./Authprovider";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { authUser } = useAuth();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (authUser?.user?._id) {
            const newSocket = io("http://localhost:3000", {
                query: { userId: authUser.user._id }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
