import React, { useEffect, useState } from 'react';
import UserInfoPanel from './UserInfoPannel';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import Header from '../../../components/User/Header/Header';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { changeOnline } from '../../../features/auth/authSlice';
import { PiChatsCircleThin } from "react-icons/pi";
const Chat = () => {
  const location = useLocation();
  const conversation = location.state?.conversation || null;
  const dispatch = useDispatch()
  // State for current chat and sidebar visibility
  const [currChat, setCurrentChat] = useState(conversation);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 

  useEffect(()=>{
   
      dispatch(changeOnline(true))
      return () => {
        
        dispatch(changeOnline(false))
      };
  },[])
  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle setting current chat
  const handleSetCurrentChat = (chat) => {
    setCurrentChat(chat);
    
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        {/* Chat list component */}
        <ChatList setCurrentChat={handleSetCurrentChat}  />
        <div className={`flex-1 ${isSidebarOpen ? 'ml-4' : 'mx-auto'}`}>
          {/* Chat window component */}
          {currChat ? <ChatWindow currChat={currChat}  /> :(
            
<div className="flex flex-col items-center justify-center h-full">
  <div style={{ fontSize: '5rem' }}><PiChatsCircleThin/></div>
  <div className="text-center mt-3">
    <p className="text-xl text-dark-500">Your messages</p>
    <p className="text-sm mt-2 text-gray-500">“The key is to listen, engage, and build relationships.”</p>
  </div>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Send Message</button>
</div>




          ) }
        </div>
        {/* User info panel */}
        {isSidebarOpen && currChat && <UserInfoPanel currChat={currChat} toggleSidebar={toggleSidebar} />}
        {/* Additional components can be added here */}
      </div>
    </>
  );
};

export default Chat;
