import React from 'react';
import { format } from 'timeago.js'; // Import timeago.js for formatting timestamps

const Message = ({ text, sender, createdAt, isSender, user }) => {
  const formattedCreatedAt = format(createdAt); // Format the createdAt timestamp

  return (
    <div className={`px-4 py-2 ${isSender ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`flex items-center mb-2 ${isSender ? 'flex-row-reverse' : ''}`}>
        <img className="w-8 h-8 rounded-full mr-2" src={isSender ? user.profilePic : sender.profilePic} alt="User Avatar" />
        {/* <div className="font-medium">{isSender ? user.userName : sender.userName}</div> */}
      </div>
     
      <div className="flex flex-col">
        <div className={`${isSender ? 'bg-white' : 'bg-blue-500 text-black'} rounded-lg p-2 shadow mb-2 max-w-sm`}>
          {text}
        </div>

        <span className="text-xs text-gray-500 ml-4">{formattedCreatedAt}</span>
      </div>
    </div>
  );
};

export default Message;
