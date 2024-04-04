import React,{useState} from 'react';
import Navbar from './Navbar';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import Header from '../../../components/User/Header/Header';
import { useLocation } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const conversation = location.state?.conversation || null
  const headerHeight = 10; // Height of your header, adjust as needed
  const chatSectionHeight = 90; // Adjust as needed to fit your layout
  const [currChat,setCurrentChat] = useState(conversation);
 


  return (
    <>
    <div>
      <Header />
    </div>
    <div className="container mx-auto">
      <div className="flex flex-col bg-white">
        <div className="flex flex-row flex-1">
          <ChatList setCurrentChat={setCurrentChat} />
          <div className="w-3/4">
            <ChatWindow currChat={currChat} />
          </div>
        </div>
        {/* Additional components can be added here */}
      </div>
    </div>
  </>
  
  );
};

export default Chat;
