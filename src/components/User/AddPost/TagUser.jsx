import { useState, useEffect } from 'react';
import { searchAll } from '../../../services/User/apiMethods';

const TagUser = ({ onClose, setTaggedUsers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await searchAll(searchQuery);
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserSelect = (user) => {

    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
        return prevSelectedUsers.filter((selectedUser) => selectedUser._id !== user._id);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleTagButtonClick = () => {

    setTaggedUsers(selectedUsers)
    onClose()
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-80">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Tag User</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search users..."
        />
        <div className="mt-4 h-60 overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : users.length > 0 ? (
            <ul>
              {users.map(user => (
                <li key={user._id} className="py-2 flex items-center text-gray-800 cursor-pointer">
                  <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  <span>{user.userName}</span>
                  <input
                    type="checkbox"
                    checked={selectedUsers.some(selectedUser => selectedUser._id === user._id)}
                    onChange={() => handleUserSelect(user)}
                    className="ml-auto"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div>No users found</div>
          )}
        </div>
        {/* Tag button */}
        <div className="mt-4 flex justify-center">
          <button onClick={handleTagButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            Tag
          </button>
        </div>
      </div>
    </div>

  );
};

export default TagUser;
