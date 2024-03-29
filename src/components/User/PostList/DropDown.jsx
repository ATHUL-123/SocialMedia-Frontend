// DropdownMenu.js
import React, { useEffect, useState } from 'react';
import ReportModal from './ReportModal';

const DropdownMenu = ({ isOpen, toggleDropdown,postId }) => {
   
    const [openReport,setOpenReport] = useState(false)

  return (
    <>
       <div className="relative flex justify-center">
     

      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Options</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Choose an option below:
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <button onClick={()=>toggleDropdown()} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Unfollow
              </button>
              <button onClick={()=>setOpenReport(!openReport)} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Report Post
              </button>
              <button onClick={toggleDropdown} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Show User Profile
              </button>
            </div>
          </div>
        </div>
       
      )}
    {openReport && <ReportModal isOpen={openReport} parentClose={toggleDropdown} onClose={() => setOpenReport(!openReport)} postId={postId} />}

    </div>
    </>
  );
};

export default DropdownMenu;
