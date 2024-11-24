import React, { createContext, useState, useEffect, useContext } from "react";
import { useAccountContext } from "./AccountContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const { account } = useAccountContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);


  useEffect(() => {
    if (account) {
      const newSocket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
        query: { userId: account._id },
        transports: ['websocket', 'polling'],
        withCredentials: true,
        forceNew: true,
        reconnectionAttempts: 5,
        timeout: 10000
      });

      setSocket(newSocket);

      newSocket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [account]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
