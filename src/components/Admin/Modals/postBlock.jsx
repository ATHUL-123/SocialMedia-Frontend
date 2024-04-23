import React from 'react';
import { takeAction } from '../../../services/Admin/apiMethods';
import { useNavigate } from 'react-router-dom'


function BlockPostModal({ isOpen, onClose, post, user }) {
    const navigate = useNavigate()
    const handleBlock = () => {

        takeAction(post._id).then((response) => {
            window.location.reload();
        }).catch((err) => {
            onClose()
        })
    }
    return (
        <div className={`fixed inset-0 z-10 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                    <div>
                        <img className="object-cover w-full h-48 rounded-md" src={post.image} alt="" />
                        <div className="mt-4 text-center">
                            <h3 className="font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                Block The Post
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to block this post? Blocking this post will prevent it from being viewed by other users.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
                        <button onClick={onClose} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                            Cancel
                        </button>
                        <button onClick={() => handleBlock()} className="w-full px-4 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                            Block
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockPostModal;
