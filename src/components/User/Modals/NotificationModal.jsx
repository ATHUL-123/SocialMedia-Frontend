import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAllNotifications } from '../../../services/User/apiMethods';
import Notification from '../Notification/NotificationItem';
import './FollowerModal.css'
function NotificationModal({ isOpen, closeModal }) {
  const modalRoot = document.getElementById('portal-root');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllNotifications() ;
       setNotifications(response)
       console.log(response);
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
    {/* Background overlay with dull color */}
    <div className="fixed inset-0 bg-gray-900 opacity-50"></div>

    {/* Modal container with fixed height and scroll effect */}
    <div className="relative p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-xl rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 max-h-screen overflow-y-auto lg:max-h-[80vh]">

      <div className="max-h-full">
        <div className="mt-5 text-center">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
            Notifications
          </h3>
          
          {/* List */}
          <div className="max-h-72 overflow-y-auto hide-scrollbar"> {/* Increased max height to 72 */}
            <ul className="text-gray-500 dark:text-gray-400 text-left">
              {notifications.map(notify => (
                <Notification key={notify._id} notify={notify} notifyClose={closeModal} />
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
          Close
        </button>
      </div>
    </div>
  </div>
</>

  

  ,
    modalRoot
  );
}

export default NotificationModal;
