import React, { useState } from 'react';
import { FaPlus, FaBell, FaUser, FaComments, FaSearch } from 'react-icons/fa';
import AddPost from '../AddPost/AddPost';
import { Link,useLocation} from 'react-router-dom';
import NotificationModal from '../Modals/NotificationModal';

const Header = ({ toggleSearch, onSearch }) => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNotification,setShowNotification] = useState(false)

  const handleSearch = (e) => {

    setSearchQuery(e.target.value); // Update the search query state
    onSearch(e.target.value); // Pass the search query to the parent component
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleNotification =()=>{
    setShowNotification(!showNotification)
  }

  const isExploreRoute = location.pathname === '/explore'

  return (
    <nav className="bg-gray-800 p-2 fixed w-full z-10 top-0">
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
            <a href="#" className="text-white font-semibold text-lg">
              Logo
            </a>
          </div>

          {/* Search Bar */}
          {isExploreRoute && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery} // Bind the value of search query
              onChange={handleSearch}
              className="py-1 px-3 pr-10 block w-64 bg-gray-700 text-white rounded-full focus:outline-none focus:bg-gray-600 focus:ring focus:ring-gray-300"
            />
            <button className="absolute top-0 right-0 mt-1 mr-1">
              {/* Add your search icon here */}
              {/* Example: <FaSearch className="text-white" /> */}
            </button>
          </div>)}

          <div className="flex items-center space-x-4">
            <button onClick={handleToggleModal} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
              <FaPlus className="text-white" />
            </button>
            <a onClick={toggleNotification} className="flex items-center justify-center w-10 h-10 mx-20 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
              <FaBell className="text-white" />
            </a>
            <button className="flex items-center justify-center w-10 h-10 mx-20 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
              <Link to="/profile"><FaUser className="text-white" /></Link>
            </button>
            <a  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
            <Link to="/chat"><FaComments className="text-white" /></Link>
            </a>
           <button onClick={toggleSearch} className="flex items-center justify-center w-10 h-10 mx-20 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
           <Link to="/explore">    <FaSearch className="text-white" /></Link>
            </button> 
          </div>
        </div>
      </div>
      {showNotification && <NotificationModal isOpen={showNotification} closeModal={toggleNotification} />}
      {showModal && <AddPost onClose={handleToggleModal} />}
    </nav>
  );
};

export default Header;
