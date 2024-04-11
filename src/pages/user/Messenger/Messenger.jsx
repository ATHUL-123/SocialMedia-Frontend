import React, { useEffect, useState } from 'react';
import UserInfoPanel from './UserInfoPannel';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import Header from '../../../components/User/Header/Header';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { changeOnline } from '../../../features/auth/authSlice';

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
        <ChatList setCurrentChat={handleSetCurrentChat} />
        <div className={`flex-1 ${isSidebarOpen ? 'ml-4' : 'mx-auto'}`}>
          {/* Chat window component */}
          {currChat && <ChatWindow currChat={currChat} />}
        </div>
        {/* User info panel */}
        {isSidebarOpen && currChat && <UserInfoPanel currChat={currChat} toggleSidebar={toggleSidebar} />}
        {/* Additional components can be added here */}
      </div>
    </>
  );
};

export default Chat;
