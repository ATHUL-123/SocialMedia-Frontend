import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchFollowing } from '../../../services/User/apiMethods';
import ListCard from '../ListCard/ListCard';
import { useSelector } from 'react-redux';
import './FollowingList.css';

function FollowingList({ isOpen, toggleModal }) {
  const modalRoot = document.getElementById('portal-root');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]); // Initialize filteredUsers
  const usersPerPage = 5;
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { following, totalCount } = await fetchFollowing(page, usersPerPage);
        setUsers([...users, ...following]);
        setFilteredUsers([...filteredUsers, ...following]); // Update filteredUsers
        setTotalUsers(totalCount);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, usersPerPage]);

  const handleViewMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchChange = event => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setFilteredUsers(users); // Reset filteredUsers to all users when the search query is empty
    } else {
      // Filter the users based on the search query
      const filteredUsers = users.filter(user => {
        return user.userName.toLowerCase().includes(query);
      });
      setFilteredUsers(filteredUsers); // Update filteredUsers with the new filtered list
    }
  };

  useEffect(() => {
    // Disable browser main screen scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Semi-transparent backdrop */}
      <div
        className="fixed inset-0 z-10 bg-black opacity-50"
        onClick={toggleModal} // Close the modal when clicking on the backdrop
      ></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="relative p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 max-h-screen">
          <div className="max-h-full overflow-y-auto">
            <div className="mt-5 text-center">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Following
              </h3>

              {/* Search field */}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="w-full px-4 py-2 mt-2 mb-4 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {/* List */}
              <div className="max-h-60 overflow-y-auto hide-scrollbar">
                <ul className="text-gray-500 dark:text-gray-400 text-left">
                  {filteredUsers.map(user => (
                    <ListCard key={user.id} user={user} userId={userId} />
                  ))}
                </ul>
              </div>

              {loading && <p>Loading...</p>}

              {users.length < totalUsers && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleViewMore}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button
              onClick={toggleModal}
              className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default FollowingList;
