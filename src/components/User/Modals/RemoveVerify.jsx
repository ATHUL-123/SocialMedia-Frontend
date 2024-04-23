import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { removeVerification } from '../../../services/User/apiMethods';
import { changeVerify } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

function RemoveConfirm({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const handleRemove = () => {
    removeVerification()
      .then((response) => {
        dispatch(changeVerify(false))

      })
      .catch((error) => {
        console.log(error);
      })
    onClose()
  }



  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Dull background overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
        <div className="relative bg-white rounded-lg shadow-xl p-6 sm:p-10">
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path
                d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                fill="#1d9bf0"
              ></path>
            </svg>
          </div>


          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Remove Verification</h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              Removing premium subscription will revoke your premium privileges, including the blue verification tick, and it will not be refunded. Are you sure you want to proceed?
            </p>

          </div>


          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="mr-4 px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
              Cancel
            </button>

            <button
              onClick={handleRemove}
              className="px-4 py-2 text-sm btn-red font-medium tracking-wide text-red capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Remove
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal-root')

  );
}

export default RemoveConfirm;
