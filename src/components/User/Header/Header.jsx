import React, { useState } from 'react';
import { FaPlus, FaBell, FaUser, FaComments } from 'react-icons/fa';
import AddPost from '../AddPost/AddPost';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);




  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

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
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="py-1 px-3 pr-10 block w-64 bg-gray-700 text-white rounded-full focus:outline-none focus:bg-gray-600 focus:ring focus:ring-gray-300"
            />
            <button className="absolute top-0 right-0 mt-1 mr-1">
              {/* Add your search icon here */}
              {/* Example: <FaSearch className="text-white" /> */}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handleToggleModal} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
              <FaPlus className="text-white" />
            </button>
            <a href="/notifications" className="flex items-center justify-center w-10 h-10 mx-20 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
              <FaBell className="text-white" />
            </a>
            <button  className="flex items-center justify-center w-10 h-10 mx-20 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
            <Link to="/profile"><FaUser className="text-white" /></Link>
            </button>
            <a href="/chat" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition-colors duration-300">
              <FaComments className="text-white" />
            </a>
          </div>
        </div>
      </div>
      {showModal && <AddPost onClose={handleToggleModal} />}
    </nav>
  );
};

export default Navbar;