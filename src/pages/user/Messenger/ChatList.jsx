import React, { useEffect, useState } from 'react';
import Conversation from './Conversation';
import { useSelector } from 'react-redux';
import { getAllConversations } from '../../../services/User/apiMethods';
const ChatList = ({setCurrentChat}) => {
  const [conversations,setConversations]=useState([])
  const {user} =useSelector((state)=>state.auth)
  useEffect(()=>{
    getAllConversations()
     .then((response)=>{
     setConversations(response.data)
     })
     .catch((error)=>{
      console.log(error);
     })
  },[])
  return (
    <div className="flex flex-col w-1/4 border-r-2 overflow-y-auto"> {/* Adjusted width */}
     <div className="border-b-2 py-4 px-2">
    <input
      type="text"
      placeholder="search chatting"
      className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
    />
  </div>
  {conversations.map((conversation) => (
      <div onClick={()=>setCurrentChat(conversation)}>
          <Conversation key={conversation._id} conversation={conversation} />
      </div>
      
      ))}
     
    </div>
  );
};

export default ChatList;
