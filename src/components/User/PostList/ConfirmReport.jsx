import React, { useEffect} from 'react';

const ConfirmationModal = ({ isOpen,onClose,parentClose }) => {
  
    const handleConfirm = () => {
       
        onClose();
        parentClose();
    };
    
    const handleCancel = () => {
        onClose();
        parentClose();
    };
    

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-green-500"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.707 3.293a1 1 0 00-1.414 0L8 13.586 2.707 8.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l12-12a1 1 0 000-1.414z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Thanks for letting us know</h2>
            <p className="mb-4">
              When you see something you don't like on this SocialMedia, you can report it if it doesn't follow our Community Guidelines, or you can remove the person who shared it from your experience.
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
