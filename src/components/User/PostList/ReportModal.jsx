import React, { useState } from 'react';
import { reportPost } from '../../../services/User/apiMethods';
import { useSelector } from 'react-redux';
import SuccessModal from './ConfirmReport';
const ReportModal = ({ isOpen,onClose,postId,parentClose }) => {
  const [reason, setReason] = useState('');
  const [success,setSuccess]=useState(false)
  const {user} = useSelector((state)=>state.auth)

  const handleSubmit = () => {
    const data ={
        reporterId:user._id,
        reporterUsername:user.userName,
        reportType:reason,
        targetId:postId,
    } 
    reportPost(postId,data)
      .then((response)=>{
        console.log(response);
        setSuccess(true)
        parentClose()
      })
      .catch((error)=>{
        setSuccess(false)
      
      })
   
      
  };

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        {isOpen && (
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Report</h2>
        <p className="mb-4">Why are you reporting this post?</p>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="Spam"
              checked={reason === 'Spam'}
              onChange={() => setReason('Spam')}
            />
            <span className="ml-2">It's spam</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Nudity or sexual activity"
              checked={reason === 'Nudity or sexual activity'}
              onChange={() => setReason('Nudity or sexual activity')}
            />
            <span className="ml-2">Nudity or sexual activity</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Hate speech or symbols"
              checked={reason === 'Hate speech or symbols'}
              onChange={() => setReason('Hate speech or symbols')}
            />
            <span className="ml-2">Hate speech or symbols</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Violence or dangerous organizations"
              checked={reason === 'Violence or dangerous organizations'}
              onChange={() => setReason('Violence or dangerous organizations')}
            />
            <span className="ml-2">Violence or dangerous organizations</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Sale of illegal or regulated goods"
              checked={reason === 'Sale of illegal or regulated goods'}
              onChange={() => setReason('Sale of illegal or regulated goods')}
            />
            <span className="ml-2">Sale of illegal or regulated goods</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Bullying or harassment"
              checked={reason === 'Bullying or harassment'}
              onChange={() => setReason('Bullying or harassment')}
            />
            <span className="ml-2">Bullying or harassment</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Intellectual property violation"
              checked={reason === 'Intellectual property violation'}
              onChange={() => setReason('Intellectual property violation')}
            />
            <span className="ml-2">Intellectual property violation</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Suicide or self-injury"
              checked={reason === 'Suicide or self-injury'}
              onChange={() => setReason('Suicide or self-injury')}
            />
            <span className="ml-2">Suicide or self-injury</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Eating disorders"
              checked={reason === 'Eating disorders'}
              onChange={() => setReason('Eating disorders')}
            />
            <span className="ml-2">Eating disorders</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Scam or fraud"
              checked={reason === 'Scam or fraud'}
              onChange={() => setReason('Scam or fraud')}
            />
            <span className="ml-2">Scam or fraud</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Drugs"
              checked={reason === 'Drugs'}
              onChange={() => setReason('Drugs')}
            />
            <span className="ml-2">Drugs</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="False information"
              checked={reason === 'False information'}
              onChange={() => setReason('False information')}
            />
            <span className="ml-2">False information</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="I just don't like it"
              checked={reason === "I just don't like it"}
              onChange={() => setReason("I just don't like it")}
            />
            <span className="ml-2">I just don't like it</span>
          </label>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
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
      </div>
      )}
       {success &&<span>true</span>}
       {/* Success Modal */}
   
        
        {success && <SuccessModal isOpen={true} parentClose={onClose} onClose={() => setSuccess(false)} />}

   
    </div>
    
  );
};

export default ReportModal;
