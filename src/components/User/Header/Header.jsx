import React, { useEffect, useState } from 'react';
import { FaPlus, FaBell, FaUser, FaComments, FaSearch } from 'react-icons/fa';
import AddPost from '../AddPost/AddPost';
import { Link, useLocation } from 'react-router-dom';
import NotificationModal from '../Modals/NotificationModal';
import NotificationCard from '../Notification/NotificationCard';
import { useSocket } from '../../../utils/SocketContext';
import { getSingleUser, getNotificationCount } from '../../../services/User/apiMethods';
import VideoCallModal from '../Modals/VcallRing';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSearch, onSearch }) => {
  const navigate = useNavigate()
  const socket = useSocket()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false)
  const [notify, setNotify] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [vCallRinging, setVCallRinging] = useState(false)
  const [callUserName, setCallUserName] = useState('');
  const [callUserProfile, setCallUserprofile] = useState('')
  const [roomId, setRoomId] = useState('')
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    getNotificationCount()
      .then((response) => {
        setNotificationCount(response.count)
      })
  }, [])

  const handleSearch = (e) => {

    setSearchQuery(e.target.value); // Update the search query state
    onSearch(e.target.value); // Pass the search query to the parent component
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('notification-get', ({ message, senderId }) => {

        setMessage(message)
        getSingleUser(senderId)
          .then((response) => {
            setUser(response)
            setNotify(true)
          })
      })

      socket.current.on('videoCallon', ({ userName, profilePic, roomId }) => {

        setCallUserName(userName)
        setCallUserprofile(profilePic)
        setRoomId(roomId)
        setVCallRinging(true)
      })




    } else {
      console.log('notttttt');
    }

  }, [socket])

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification)
    setNotificationCount(0)
  }

  const onReject = () => {
    setVCallRinging(false)
  }

  const onAccept = () => {
    navigate(`/room/${roomId}`)
  }

  const isExploreRoute = location.pathname === '/explore'

  return (
    <nav className="bg-blue-400 p-2 fixed w-full z-10 top-0">
      {notify && <NotificationCard isOpen={notify} onClose={() => setNotify(false)} message={message} user={user} />}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <Link to='/' className="text-white font-semibold text-lg">
              HYPER EDGE
            </Link>
          </div>

          {/* Search Bar */}
          {isExploreRoute && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery} // Bind the value of search query
                onChange={handleSearch}
                className="py-1 px-3 pr-10 block w-64 bg-white text-gray-800 rounded-full focus:outline-none focus:ring focus:ring-gray-300"
              />
              <button className="absolute top-0 right-0 mt-1 mr-1">
                {/* Add your search icon here */}
                {/* Example: <FaSearch className="text-white" /> */}
              </button>
            </div>)}

          <div className="flex items-center space-x-4">
            <button onClick={handleToggleModal} className="flex items-center justify-center w-10 h-10   focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:rounded-full">
              <FaPlus className="text-white" />
            </button>
            <a onClick={toggleNotification} className="flex items-center justify-center relative w-10 h-10 focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:rounded-full">
              <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-gradient-to-br from-green to-green rounded-full text-white text-xs font-bold">{notificationCount}</span>
              <FaBell className="text-white" />
            </a>


            <button className="flex items-center justify-center w-10 h-10   focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:rounded-full">
              <Link to="/profile">
                <FaUser className="text-white" />
              </Link>
            </button>
            <a className="flex items-center justify-center w-10 h-10   focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:rounded-full">
              <Link to="/chat">
                <FaComments className="text-white" />
              </Link>
            </a>
            <button onClick={toggleSearch} className="flex items-center justify-center w-10 h-10   focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:rounded-full">
              <Link to="/explore">
                <FaSearch className="text-white" />
              </Link>
            </button>
          </div>

        </div>
      </div>
      {showNotification && <NotificationModal isOpen={showNotification} closeModal={toggleNotification} />}
      {showModal && <AddPost onClose={handleToggleModal} />}
      {vCallRinging && <VideoCallModal show={vCallRinging} onReject={onReject} onAccept={onAccept} callerName={callUserName} callerProfile={callUserProfile} />}
    </nav>
  );
};

export default Header;
