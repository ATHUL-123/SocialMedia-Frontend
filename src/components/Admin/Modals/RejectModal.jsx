import React, { useState } from 'react';

function RejectReasonForm({ kyc, isOpen, onClose, handleReject }) {
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    handleReject(kyc._id, reason);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 ${isOpen ? 'bg-opacity-50' : 'hidden'}`}>
      {isOpen && (
        <div className="bg-white w-full max-w-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Report</h2>
          <p className="mb-4">Select a reason for rejecting the KYC request:</p>
          <form onSubmit={handleSubmit}> {/* Attach onSubmit event to the form */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Information mismatch"
                  checked={reason === 'Information mismatch'}
                  onChange={() => setReason('Information mismatch')}
                />
                <span className="ml-2">Information mismatch</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Insufficient Requirements"
                  checked={reason === 'Insufficient Requirements'}
                  onChange={() => setReason('Insufficient Requirements')}
                />
                <span className="ml-2">Insufficient Requirements</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Invalid ID proof"
                  checked={reason === 'Invalid ID proof'}
                  onChange={() => setReason('Invalid ID proof')}
                />
                <span className="ml-2">Invalid ID proof</span>
              </label>
              {/* Add more rejection reasons as needed */}
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit" // Add type="submit" to the Submit button
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RejectReasonForm;
