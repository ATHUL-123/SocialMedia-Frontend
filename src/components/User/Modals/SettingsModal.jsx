import React, { useState, useEffect } from 'react';
import { togglePrivacy } from '../../../services/User/apiMethods';
import './SettingsModal.css'; // Import CSS file for custom styles
import { changePrivacy } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const SettingsModal = ({ isOpen, closeModal,user }) => {
    // State variables to track the state of each setting
    const [notificationsOff, setNotificationsOff] = useState(false);
    const [privateAccount, setPrivateAccount] = useState(user.isPrivate);
    const [goOffline, setGoOffline] = useState(false);
    const dispatch = useDispatch();

    const handleSaveSettings = async () => {
        try {
            const response = await togglePrivacy(privateAccount);
            console.log(response);
            dispatch(changePrivacy(response.isPrivate));
            toast.success('Changes saved');
            closeModal();
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-50"
                        onClick={closeModal}
                        aria-hidden="true"
                    ></div>
                    <div
                        className="fixed inset-0 z-20 overflow-y-auto flex justify-center items-center"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>

                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Settings</h3>
                                </div>

                                <div className="mt-4 space-y-4">
                                    <label className="flex items-center checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={notificationsOff}
                                            onChange={() => setNotificationsOff(!notificationsOff)}
                                            className="form-checkbox hidden"
                                        />
                                        <span className="checkmark"></span>
                                        <span className="ml-2 text-sm text-gray-700">Turn off notifications</span>
                                    </label>
                                    <label className="flex items-center checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={privateAccount}
                                            onChange={() => setPrivateAccount(!privateAccount)}
                                            className="form-checkbox hidden"
                                        />
                                        <span className="checkmark"></span>
                                        <span className="ml-2 text-sm text-gray-700">Private account</span>
                                    </label>
                                    <label className="flex items-center checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={goOffline}
                                            onChange={() => setGoOffline(!goOffline)}
                                            className="form-checkbox hidden"
                                        />
                                        <span className="checkmark"></span>
                                        <span className="ml-2 text-sm text-gray-700">Go offline</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6 sm:flex sm:items-center sm:justify-between">
                                <button
                                    onClick={closeModal}
                                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSaveSettings}
                                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default SettingsModal;
