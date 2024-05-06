import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import Picker from '@emoji-mart/react'
import { getAllMessages, getSingleUser, sendNewMessage, addNewConversation } from '../../../services/User/apiMethods';
import { useSelector } from 'react-redux';
import { FcVideoCall } from "react-icons/fc";
import Spinner from '../../../components/User/Spinner/Spinner';
import { useSocket } from '../../../utils/SocketContext';
import './chatWindow.css'
import { BsChatDots } from "react-icons/bs";
import { messageReaded } from '../../../services/User/apiMethods';
import { useNavigate } from 'react-router-dom';
const ChatWindow = ({ currChat }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  };
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate()
  const scrollRef = useRef()
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.auth)
  const [sender, setSender] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [isSenderTyping, setIsSenderTyping] = useState(false);
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);
  const [readed, setReaded] = useState(false)
  const [conv, setConv] = useState(currChat || null)

  const socket = useSocket();
  const [allReaded, setAllReaded] = useState(false)



  useEffect(() => {


    if (socket.current) {
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
          recieverId: data.recieverId
        });


      });
    }



  }, []);


  const emitMessageRead = (senderId, recieverId) => {
    // Emit the "messageRead" event to the server
    if (socket.current) {
      socket.current.emit("messageRead", { senderId, recieverId });
    }
  }

  useEffect(() => {
    console.log('curururururu', currChat);
    if (currChat) {
      const otherUserId = currChat.members.find(memberId => memberId !== user._id);
      console.log('cdfadsf', otherUserId);
      emitMessageRead(otherUserId, user._id)
    }
  }, [currChat, arrivalMessage]);




  useEffect(() => {


    socket.current.on("userTyping", ({ senderId, recieverId }) => {
      if (senderId !== user._id) {
        console.log('inininininin');



        setIsSenderTyping(true);
      } else {
        console.log('ououououou');
        console.log('currchat when typing', senderId);
        setIsReceiverTyping(true);

      }
    });

    socket.current.on("userStopTyping", ({ senderId }) => {
      if (senderId !== user._id) {
        console.log('stopin');
        setIsSenderTyping(false);
      } else {
        console.log('stoptout');
        setIsReceiverTyping(false);
      }
    });


  }, [])

  useEffect(() => {
    socket.current.on("messageReadByRecipient", ({ senderId, recieverId }) => {
      console.log('provokkeddd');
      setAllReaded(true)
      setMessages(prevMessages => {
        return prevMessages.map(message => {
          if (message.recieverId === recieverId) {
            return { ...message, isRead: true };
          }
          return message;
        });
      });

    });

  }, []);

  useEffect(() => {
    if (arrivalMessage && currChat?.members.includes(arrivalMessage.senderId)) {
      setMessages(prev => {
        const updatedMessages = [...prev, arrivalMessage];
        // If the arrival message belongs to the current user's chat,
        // mark the previous last message as read
        const lastIndex = updatedMessages.length - 1;
        if (lastIndex > 0) {
          updatedMessages[lastIndex - 1] = {
            ...updatedMessages[lastIndex - 1],
            isRead: true
          };
        }
        return updatedMessages;
      });
    }
  }, [arrivalMessage, currChat]);


  useEffect(() => {
    if (socket.current) {
      socket.current.on('getUsers', users => {
        console.log('userrrrrrsddd');
        console.log(users);

      })
    }

  }, [socket])


  useEffect(() => {


    if (currChat) {
      setLoading(true)
      messageReaded(currChat._id, user._id)
        .then((response) => {
          setMessages(response.data);

          const otherUserId = currChat.members.find(memberId => memberId !== user._id);
          getSingleUser(otherUserId)
            .then((response) => {
              //oi for inticaton
              emitMessageRead(otherUserId, user._id);

              setSender(response)
              setConv(currChat.members)
              setLoading(false)
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currChat]);

  const handleSend = () => {
    if(newMessage.trim()){


    const recieverId = currChat.members.find(member => member !== user._id)
    const data = {
      conversationId: currChat._id,
      senderId: user._id,
      text: newMessage,
      recieverId: recieverId
    }

    //socket sending message


    sendNewMessage(data)
      .then((response) => {
        socket.current.emit("sendMessage", {

          senderId: user._id,

          recieverId: recieverId,
          text: newMessage
        })
        setAllReaded(false)
        setMessages(prevMessages => [...prevMessages, response.data]);
        const conv = {
          members: [user._id, recieverId],
          lastMessage: newMessage,
          lastMessageTime: new Date().toISOString() // Convert the timestamp to ISO 8601 format
        };

        addNewConversation(conv)
        setNewMessage('')
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }




  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages])

  const handleTyping = () => {


    const recieverId = currChat.members.find(member => member !== user._id);
    if (sender) {
      socket.current.emit("typing", { senderId: sender._id, recieverId: recieverId });
    }
  };

  const handleStopTyping = () => {
    const recieverId = currChat.members.find(member => member !== user._id);
    if (sender) {
      socket.current.emit("stopTyping", { senderId: sender._id, recieverId: recieverId });
    }
  };


  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomString;
  }

  //video call..........................
  const handleVideoCall = () => {
    const recieverId = currChat.members.find(member => member !== user._id);

    const roomId = generateRandomString(5);
    socket.current.emit('videoCallEmit', { recieverId, userName: user.userName, profilePic: user.profilePic, roomId })
    console.log('ssss');
    navigate(`/room/${roomId}`)
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="relative h-[90vh] pr-0 flex flex-col flex-1" style={{ marginTop: '4rem', overflowY: 'hidden' }}>
      <div className="z-20 mx-0 flex flex-grow-0 flex-shrink-0 w-full pr-0 bg-white border-b">

        {sender && (
          <>
            <div className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
              style={{ backgroundImage: `url(${sender.profilePic})` }}>
            </div>
            <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
              <div className="overflow-hidden text-base font-medium leading-tight text-gray-600 whitespace-no-wrap">{sender.userName}</div>
              {sender && isReceiverTyping ? (
                <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">Typing...</div>
              ) : (
                null
              )}

            </div>



            <button onClick={handleVideoCall} className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
              <FcVideoCall className="w-8 h-8 mr-5" />
            </button>



          </>
        )}
      </div>

      <div className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-cover">
        <div className="self-center flex-1 w-full max-w-xl overflow-y-scroll">
          <div className="relative flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-cover" style={{ overflowY: 'scroll' }}>
            {currChat ? (
              <>
                <div className="self-center px-2 py-1 mx-0 my-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">Channel was created</div>
                <div className="self-center px-2 py-1 mx-0 my-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">{formatDate(currChat.createdAt)}</div>
              </>
            ) : <div className="flex flex-col justify-center items-center h-full" style={{ marginTop: '12rem' }}>
              <BsChatDots className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-lg font-bold mb-2">Your messages</h2>
              <p className="text-sm text-gray-600">Send private photos and messages to a friend or group.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Send message</button>
            </div>


            }


            {messages.map((message, index) => (
              <Message
                key={index}
                index={index}
                messageId={message._id}
                createdAt={message.createdAt}
                text={message.text}
                sender={sender}
                user={user}
                isSender={message.senderId === user._id}
                isRead={message.isRead}
                allReaded={allReaded}
                deleteType={message.deleteType}
                socket={socket.current}
                message={message}
              />
            ))}
            {sender && isReceiverTyping && (
              <div className="self-start w-3/4 my-2">
                <div className="p-4 text-sm bg-white rounded-t-lg rounded-r-lg shadow">
                  Typing......
                </div>
              </div>
            )}
            {/* This empty div ensures that the scrollRef always points to the bottom */}
            <div ref={scrollRef}></div>
          </div>

        </div>
        <span>
          {showEmojiPicker && (
            <Picker
              onEmojiSelect={(emoji) => {
                setNewMessage((prevMessage) => prevMessage + emoji.native);
              }}
              style={{ position: "fixed", bottom: "500px", right: "10px", backgroundColor: "white" }}
            />
          )}
        </span>
        <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
          <div className="w-full">

            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <button
                onClick={toggleEmojiPicker}
                className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
              >
                <svg className="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="10" fill="#FFEB3B" />
                  <path d="M8 14h8v1.5H8z" />
                  <circle cx="9" cy="10" r="1" />
                  <circle cx="15" cy="10" r="1" />
                  <path fill="none" d="M0 0h24v24H0z" />
                </svg>
              </button>
            </span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-6">
              <button type="submit" onClick={handleSend}
                className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fillRule="nonzero" d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z" />
                </svg>
              </button>
            </span>
            <input type="search"
              onFocus={handleTyping}
              onBlur={handleStopTyping}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}

              className="w-full py-2 pl-10 text-sm bg-white border border-transparent appearance-none rounded-tg placeholder-gray-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
              placeholder="Message..." autoComplete="off" />
          </div>
        </div>
      </div>
    </div>



  );
};

export default ChatWindow;
