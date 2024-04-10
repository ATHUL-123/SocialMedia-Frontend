import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { BsCheck2All } from "react-icons/bs";
import { CiCircleAlert } from "react-icons/ci";
import { deleteMessage } from '../../../services/User/apiMethods';

const Message = ({index, text, createdAt, isSender, messageId, allReaded, deleteType,socket,message }) => {
  const formattedCreatedAt = format(createdAt);
  const [messageRead, setMessageRead] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selfDeleted, setSelfDeleted] = useState(false);
  const [everyOneDelete,setEveryOneDelete] = useState(false)

  useEffect(() => {
    if (allReaded) {
      console.log('yeas message readed',index);
      setMessageRead(true);
    }
  }, [allReaded]);

  useEffect(()=>{
    socket.on("messageDeleted",({deletedMessageIndex,deleteType})=>{
      console.log('event catched success fully',deleteType);
      console.log(index+ '====' + deletedMessageIndex);
      if (index === deletedMessageIndex) {
        console.log('bitchhhhhhhhhhhhh');
        if (deleteType === 'self') {
          setSelfDeleted(true);
        } else if(deleteType === 'everyone') {
          setEveryOneDelete(true);
        }
      }
    })
  },[])

  const handleDelete = async (deleteType) => {
    try {
      console.log('jejejej');
      await deleteMessage(messageId, deleteType);
      if (deleteType === 'self') {
        setSelfDeleted(true);
      }else{
        setEveryOneDelete(true)
      }

      socket.emit('deleteMessage',{index,deleteType,recieverId:message.recieverId})
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (selfDeleted && isSender || (deleteType === 'self' && isSender)) {
    return null;
  }

  return (
    <>
    <div
    className={`${isSender ? 'self-end' : 'self-start'} max-w-3/4 my-2 ${isSender ? 'ml-auto' : 'mr-auto'}`}
    onMouseEnter={() => !everyOneDelete && deleteType !== 'everyone' && setHovered(true)} 
    onMouseLeave={() => !everyOneDelete && deleteType !== 'everyone' && setHovered(false)} 
  >
    <div className={`${isSender ? 'p-4 text-sm bg-white rounded-t-lg rounded-l-lg shadow' : 'p-4 text-sm bg-white rounded-t-lg rounded-r-lg shadow inline-block'}`}>
      <div className="flex items-center relative">
        {everyOneDelete || deleteType !== 'everyone' && (
          <div className='pr-3'>
            {messageRead ? (
              isSender && <BsCheck2All className="text-blue-500 mr-1" />
            ) : (
              isSender && <BsCheck2All className="text-gray-500 mr-1" />
            )}
          </div>
        )}
        {everyOneDelete || deleteType === 'everyone' ? (
          <span className="flex items-center">
            <CiCircleAlert className="w-4 h-4 mr-1 text-red-500" />
       {isSender ?     <span className="text-xs">You deleted this message</span> : <span className="text-xs">This message was deleted</span> }
          </span>
        ) : (
          <span>{text}</span>
        )}
  
        {/* Three-dot menu */}
        {hovered && isSender && !everyOneDelete && deleteType !== 'everyone' && ( 
          <div className="relative ml-2">
            <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => e.stopPropagation()}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01m0 6v.01m0 6v.01"></path>
            </svg>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => handleDelete('self')}>
                Delete for me
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => handleDelete('everyone')}>
                Delete for everyone
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="text-xs text-gray-500 mt-1">{formattedCreatedAt}</div>
  </div>
  </>
  );
};

export default Message;
