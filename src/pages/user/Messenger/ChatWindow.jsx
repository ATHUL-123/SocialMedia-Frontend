import React, { useEffect, useState ,useRef} from 'react';
import Message from './Message';
import { getAllMessages,getSingleUser,sendNewMessage,addNewConversation } from '../../../services/User/apiMethods';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/User/Spinner/Spinner';
import io from 'socket.io-client';



const ChatWindow = ({ currChat }) => {
    
   
    const scrollRef = useRef()
    const [messages, setMessages] = useState([]);
    const {user} = useSelector((state)=>state.auth)
    const [sender,setSender] = useState(null)
    const [loading,setLoading] = useState(false)
    const [newMessage,setNewMessage] = useState('')
    const [arrivalMessage,setArrivalMessage] =useState(null)
    const [isSenderTyping, setIsSenderTyping] = useState(false);
const [isReceiverTyping, setIsReceiverTyping] = useState(false);
    const socket = useRef()
  
    useEffect(() => {
        socket.current = io('http://localhost:7002');
        socket.current.on("getMessage",(data)=>{
       
          setArrivalMessage({
            senderId:data.senderId,
            text:data.text,
            createdAt:Date.now()
          })
        })
        return () => {
            socket.current.disconnect();
        };

       
  
    }, []);

useEffect(()=>{
  socket.current.on("userTyping", ({ senderId }) => {
    if (senderId !== user._id) {
        console.log('inininininin');
        setIsSenderTyping(true);
    } else {
      console.log('ououououou');
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
},[])






    useEffect(()=>{
     
      arrivalMessage && currChat?.members.includes(arrivalMessage.senderId) &&
      setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,currChat])


    useEffect(()=>{
        socket.current.emit('addUser',user._id)
        socket.current.on('getUsers',users=>{
            console.log(users);
        })
    },[socket])
    

    useEffect(() => {
       
        if (currChat) {
            setLoading(true)
            getAllMessages(currChat._id)
                .then((response) => {
                    setMessages(response.data);
                    const otherUserId = currChat.members.find(memberId => memberId !== user._id);   
                    getSingleUser(otherUserId)
                    .then((response)=>{
                     
                      setSender(response)
                      setLoading(false)
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [currChat]);

    const handleSend=()=>{
       const data={
            conversationId:currChat._id,
            senderId:user._id,
            text:newMessage
        }
        const recieverId = currChat.members.find(member=>member !== user._id)
        //socket sending message
     
        socket.current.emit("sendMessage",{
          senderId:user._id,
         
          recieverId:recieverId,
          text:newMessage
        })

      sendNewMessage(data)
       .then((response)=>{
      
        setMessages(prevMessages => [...prevMessages, response.data]);
        const conv = {
          members: [user._id, recieverId],
          lastMessage: newMessage,
          lastMessageTime: new Date().toISOString() // Convert the timestamp to ISO 8601 format
        };
  
        addNewConversation(conv)
         setNewMessage('')
       })
       .catch((error)=>{
        console.log(error);
       })
      
      

    }

    useEffect(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    },[messages])

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
  

    if(loading){
        return <Spinner/>
    }

    return (
      <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
          <div className="flex items-center mt-20">
              {sender && (
                  <>
                      <img
                          src={sender.profilePic} // Assuming sender.profilePic contains the URL of the user's profile picture
                          alt={sender.userName} // Assuming sender.userName contains the user's name
                          className="h-8 w-8 rounded-full mr-2"
                      />
                      <span className="font-semibold">{sender.userName}</span>
                       {/* Sender's typing indicator */}
                {isReceiverTyping && (
                    <span className="text-sm text-gray-500">Typing...</span>
                )}
                  </>
              )}
          </div>
          {/* Add any additional components or information here */}
      </div>
      <div className="bg-gray-200 flex-1 overflow-y-scroll" ref={scrollRef}>
          {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                  <Message
                      createdAt={message.createdAt}
                      text={message.text}
                      sender={sender}
                      user={user}
                      isSender={message.senderId === user._id} // Assuming sender field contains sender info including _id
                  />
              </div>
          ))}
  {isReceiverTyping && (
<div className={`px-4 py-2 flex justify-start`}  >
      <div className={`flex items-center mb-2}`}>
        <img className="w-8 h-8 rounded-full mr-2" src={sender.profilePic} alt="User Avatar" />
        {/* <div className="font-medium">{isSender ? user.userName : sender.userName}</div> */}
      </div>
     
      <div className="flex flex-col">
        <div className={` bg-blue-500 text-black rounded-lg p-2 shadow mb-2 max-w-sm`}>
          Typing.....
        </div>

     
      </div>
    </div>
      )}
      </div>
      <div className="bg-gray-100 px-4 py-2">
          <div className="flex items-center">
              <input
                    onFocus={handleTyping}
                    onBlur={handleStopTyping}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border rounded-full py-2 px-4 mr-2" type="text" placeholder="Type your message..." />
                  

              <button
                  onClick={handleSend}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
                  Send
              </button>
          </div>
      </div>
  </div>
  
      
    );
};

export default ChatWindow;
