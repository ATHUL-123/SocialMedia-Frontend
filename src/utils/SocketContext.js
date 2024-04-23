
import React, { createContext, useContext, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux'
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const {user} = useSelector((state)=>state.auth)

  useEffect(() => {

 // Initialize socket connection when component mounts
 socket.current = io('https://hyperedge.online');
 if(user){
  socket.current.emit('addUser', user._id)
 }
 
 // Disconnect socket when component unmounts
 return () => {
   if (socket.current) {
     socket.current.disconnect();
   }
 };

   
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
