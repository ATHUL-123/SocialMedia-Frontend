import React, { useState } from 'react';
import RejectReasonForm from '../Modals/RejectModal';
function KycCard({ kyc, handleReject, handleAccept }) {
  const formattedDOB = new Date(kyc.dateOfBirth).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [showIdProof, setShowIdProof] = useState(false);
  const [reject, setReject] = useState(false)

  const toggleIdProof = () => {
    setShowIdProof(!showIdProof);
  };

  return (

    <li className="col-span-1 mt-5 ms-5 divide-y divide-gray-200 rounded-lg bg-white shadow">
      {reject && <RejectReasonForm kyc={kyc} isOpen={reject} onClose={() => setReject(false)} handleReject={handleReject} />}
      {/* First person */}
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">{kyc.fullName}</h3>

          </div>
          <p className="mt-1 truncate text-sm text-gray-500">Account owner</p>
          <p className="mt-1 truncate text-sm text-gray-500">{kyc.userId.userName}</p>
          <p>DOB: {formattedDOB}</p>
          <p>Email: <a className="text-blue-500">{kyc.userId.email}</a></p>
          <a className="text-blue-500 cursor-pointer" onClick={toggleIdProof}>IdProof</a>
          <p>Gender: {kyc.gender}</p>

          <span>PaymentStatus:</span>  <span className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${kyc.paymentStatus ? 'text-blue-600 bg-green-50 ring-1 ring-inset ring-green-600/20' : 'text-red-600 bg-red-50 ring-1 ring-inset ring-red-600/20'}`}>
            {kyc.paymentStatus ? 'Paid' : 'Pending'}
          </span>

        </div>

        <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={kyc.userId.profilePic} alt="" />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          {kyc.actionTaken ? (
            <div className="flex w-0 flex-1 items-center text-green-400">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M13.25 6.25a1.25 1.25 0 00-1.767-1.767L7 10.233l-2.483-2.484a1.25 1.25 0 10-1.767 1.767l3 3a1.25 1.25 0 001.767 0l6-6z" clipRule="evenodd" />
              </svg>
              <p className="ml-2">Accepted</p>
            </div>
          ) : (
            <div className="flex w-0 flex-1">
              <a onClick={() => handleAccept(kyc._id)} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M13.25 6.25a1.25 1.25 0 00-1.767-1.767L7 10.233l-2.483-2.484a1.25 1.25 0 10-1.767 1.767l3 3a1.25 1.25 0 001.767 0l6-6z" clipRule="evenodd" />
                </svg>
                Accept
              </a>
              <div onClick={() => setReject(true)} className="-ml-px flex w-0 flex-1">
                <a href="#" className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.25 7.75a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm-5.5 0a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm2.25-7a.75.75 0 011.5 0h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-1.5 0h-2.5a.75.75 0 010-1.5h2.5zm-7.5 8.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H.25z" clipRule="evenodd" />
                  </svg>
                  Reject
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
      {showIdProof && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">

          <button onClick={toggleIdProof} className="absolute top-0 right-0 m-4 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 focus:outline-none z-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative">

            <img src={kyc.idProof} alt="ID Proof" className="max-w-full max-h-full" />
          </div>
        </div>
      )}

    </li>
  );
}

export default KycCard;
