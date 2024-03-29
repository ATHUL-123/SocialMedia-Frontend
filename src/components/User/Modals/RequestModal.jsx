import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getRequests } from '../../../services/User/apiMethods';
import RequestList from '../ListCard/RequestList'
import './FollowerModal.css'
function RequestModal({ isOpen, closeModal }) {
  const modalRoot = document.getElementById('portal-root');
  const [loading, setLoading] = useState(false);
  const [requset, setRequest] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRequests();
        setRequest(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Always set loading to false, even in case of error
      }
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
      
      {/* Modal content */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="relative p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 max-h-screen">
          <div className="max-h-full overflow-y-auto">
            <div className="mt-5 text-center">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
               Request
              </h3>

              {/* Search field */}
              <input
                type="text"
               
                placeholder="Search users..."
                className="w-full px-4 py-2 mt-2 mb-4 text-gray-800 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {/* List */}
              <div className="max-h-60 overflow-y-auto hide-scrollbar">
  <ul className="text-gray-500 dark:text-gray-400 text-left">
    {requset.map(user => (
      <RequestList key={user._id} user={user} />
    ))}
  </ul>
</div>



              {loading && <p>Loading...</p>}

             
            </div>
          </div>

          <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button
              onClick={closeModal}
              className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              close
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default RequestModal;
