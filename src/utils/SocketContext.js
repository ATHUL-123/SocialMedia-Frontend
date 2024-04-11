

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import {useSelector} from 'react-redux'
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const {user} = useSelector((state)=>state.auth)
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create socket connection
    const newSocket = io('http://localhost:7002');
    setSocket(newSocket);
 
    // Clean up socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
