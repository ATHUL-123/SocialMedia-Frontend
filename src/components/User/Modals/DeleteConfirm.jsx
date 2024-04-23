import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { deletePost } from '../../../services/User/apiMethods';
import { toast } from 'react-toastify';
import { getPost } from '../../../features/post/postSlice';
import { useDispatch } from 'react-redux';

function DeleteConfirm({ isOpen, onClose, postId }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useDispatch()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onClose();
  };

  const deleteOne = (postId) => {
    try {

      deletePost(postId)
        .then((response) => {

          dispatch(getPost())
        })
        .catch((error) => {
          toast.error(error);
        })

      setIsModalOpen(!isModalOpen);
      onClose();
    } catch (error) {
      toast.error(error)
    }
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Delete Post</h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
          </div>


          <div className="mt-6 flex justify-center">
            <button onClick={toggleModal} className="mr-4 px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
              Cancel
            </button>

            <button onClick={() => deleteOne(postId)} className="px-4 py-2 text-sm btn-red font-medium tracking-wide text-red capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal-root')

  );
}

export default DeleteConfirm;
