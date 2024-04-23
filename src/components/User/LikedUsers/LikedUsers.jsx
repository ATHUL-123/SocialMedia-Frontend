import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchLiked } from '../../../services/User/apiMethods';
import ListCard from '../ListCard/ListCard';
import { useSelector } from 'react-redux';
import '../Modals/FollowerModal.css'
function LikedUsers({ isOpen, toggleModal, postId }) {
  const modalRoot = document.getElementById('portal-root');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.auth)
  const userId = user._id;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const response = await fetchLiked(postId);
        setUsers(response);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);





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
          <div className="max-h-[400px] overflow-y-auto">
            <div className="mt-5 text-center">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Liked Users
              </h3>

              {/* List */}
              <div className="max-h-full overflow-y-auto hide-scrollbar">
                <ul className="text-gray-500 dark:text-gray-400 text-left">
                  {users.map(user => (
                    <ListCard hideButton={true} key={user.id} user={user} userId={userId} />
                  ))}
                </ul>
              </div>

              {loading && <p>Loading...</p>}

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

export default LikedUsers;
