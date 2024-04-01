import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { fetchUsers } from '../../../services/User/apiMethods';
import './UserList.css'

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery,setSearchQuery] = useState('')
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, total } = await fetchUsers(page, usersPerPage, searchQuery);
        if(page===1){
          setUsers(data); // Replace the existing users with the new data
        }else{
          setUsers([...users,...data])
        }
      
        setTotalUsers(total);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, searchQuery, usersPerPage]);

  const handleSearch = async (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPage(1); // Reset page to 1 when search query changes
  };

  const handleViewMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <div className="h-80vh py-8 px-10 ml-10 mt-10 bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
    <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">People</h2>
    
    {/* Search bar */}
    <div className="mt-4 relative">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search people"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <svg
        className="absolute right-3 top-3 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 17l-2.001-2.001"
        />
      </svg>
    </div>
  
    {/* User list */}
    <div className="mt-8 space-y-4 scroll-container" style={{ maxHeight: 'calc(100% - 50px)', overflowY: 'auto' }}>
      {users.map(user => (
        <UserCard key={user._id} user={user} />
      ))}
      {loading && <p>Loading...</p>}
      {(users.length < totalUsers) && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none" onClick={handleViewMore}>
          View More
        </button>
      )}
    </div>
  </div>
  
  );
};

export default UsersList;
