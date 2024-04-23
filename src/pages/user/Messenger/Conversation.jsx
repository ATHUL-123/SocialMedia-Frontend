import React, { useEffect, useState } from 'react';
import { getSingleUser, getAllMessages } from '../../../services/User/apiMethods';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { useSocket } from '../../../utils/SocketContext';

function Conversation({ conversation, setOnlineUsers }) {
  const formattedCreatedAt = format(conversation.lastMessageTime);
  const [convUser, setConvUser] = useState('');
  const [lastMessage, setLastMessage] = useState(conversation.lastMessage);
  const { user } = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);

  const [isOnline, setIsOnline] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    const otherUserId = conversation.members.find(memberId => memberId !== user._id);
    getSingleUser(otherUserId)
      .then((response) => {
        setConvUser(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    if (socket.current) {
      socket.current.emit('fetchOnline', { userId: user._id })
      socket.current.on('getUsers', users => {
        const online = users.filter(user => user.userId !== user._id);
        setOnlineUsers(online);
        setIsOnline(online.some(user => user.userId === convUser._id));
      });
    } 
  }, [socket, convUser]);

  useEffect(() => {
    getAllMessages(conversation._id)
      .then((response) => {
        const unreadCount = response.data.filter(message => !message.isRead && message.senderId !== user._id).length;
        setCount(unreadCount);
      });
  }, []);

  return (
    <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
      <div className="flex justify-between w-full focus:outline-none">
        <div className="flex justify-between w-full">
          <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
            <img className="object-cover w-12 h-12 rounded-full" src={convUser.profilePic} alt="" />
            {isOnline && (
              <div className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full" style={{ width: '0.80rem', height: '0.80rem' }}>
                <div className="bg-green-500 rounded-full" style={{ width: '0.6rem', height: '0.6rem' }}></div>
              </div>
            )}
          </div>
          <div className="items-center flex-1 min-w-0">
            <div className="flex justify-between mb-1">
              <h2 className="text-sm font-semibold text-black">{convUser.userName}</h2>
              <div className="flex">
                {conversation.lastMessage && (
                  <span className="ml-1 text-xs font-medium text-gray-600">{formattedCreatedAt}</span>
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm leading-none truncate">
              <span>{lastMessage}</span>
              {count !== 0 && <span v-else className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full">{count}</span>}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Conversation;
