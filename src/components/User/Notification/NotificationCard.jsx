import React from 'react';

const NotificationCard = ({ isOpen, onClose, message, user }) => {
    return (
        <div className={`mt-5 mr-5 fixed top-0 right-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear z-50">
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium text-sm text-slate-400">New Notification</span>
                    <button onClick={onClose} className="-mr-1 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 h-5 w-5 rounded-full flex justify-center items-center">
                        <svg className="h-2 w-2 fill-current items-center" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
                    </button>
                </div>
                <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
                    <div className="relative flex flex-shrink-0 items-end">
                        <img className="h-16 w-16 rounded-full" src={user.profilePic} alt="User Avatar" />
                        <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                        <span className="font-semibold tracking-tight text-xs">{user.userName}</span>
                        <span className="ml-2 text-xs leading-none opacity-50">{message}:</span>
                        <div>
                            <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75 mt-1">a few seconds ago</span>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default NotificationCard;
