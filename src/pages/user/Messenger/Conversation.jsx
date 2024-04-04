import React, { useEffect, useState } from 'react'
import { getSingleUser } from '../../../services/User/apiMethods';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js'; 
function ConverSation(conversation) {
  const formattedCreatedAt = format(conversation.conversation.lastMessageTime);
    const [convUser,setConvUser] = useState('')
    const {user} = useSelector((state)=>state.auth)
    useEffect(()=>{
        console.log('con',conversation);
        const otherUserId = conversation.conversation.members.find(memberId => memberId !== user._id);
        getSingleUser(otherUserId).then((response)=>{
          setConvUser(response)
        }).catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div className="flex flex-row py-4 px-2 items-center border-b-2">
  <div className="w-1/4">
    <img
      src={convUser.profilePic}
      className="object-cover h-12 w-12 rounded-full"
      alt=""
    />
  </div>
  <div className="w-full">
    <div className="flex flex-col">
      <div className="text-lg font-semibold">{convUser.userName}</div>
      {conversation.conversation.lastMessage &&(
      <div className="flex items-center">
    
        <span className="text-gray-500 mr-2">{formattedCreatedAt}:</span>

        <span className="text-gray-500">{conversation.conversation.lastMessage}</span>
      </div>)}
    </div>
  </div>
</div>

  )
}

export default ConverSation