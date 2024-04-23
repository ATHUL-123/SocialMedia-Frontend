import { MdOutlineVideoCall } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import React, { useEffect } from 'react';
import Ringtone from '../../../const/Ringtone/vCallRingTone.mp3'

const VideoCallModal = ({ show, onAccept, onReject, callerName, callerProfile }) => {
  useEffect(() => {

    let audio;

    if (show) {
      audio = new Audio(Ringtone);
      audio.play().catch(error => {
        // Handle play error
        console.error('Failed to play audio:', error);
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [show]);

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex  items-start justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 mt-14 rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 items-center justify-center mb-4">
              <span className="ml-4 text-lg font-semibold">
                Incoming call from
              </span>
              <img
                src={callerProfile}
                alt={callerName}
                className="w-12 h-12 rounded-full"
              />
              <span className="ml-4 text-lg font-semibold">
                {callerName}
              </span>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onReject}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <div className='flex gap-3 justify-center items-center'>
                  <MdCancel />
                  Reject
                </div>
              </button>
              <button
                onClick={onAccept}
                className="bg-purple-500  text-white px-4 py-2 rounded hover:bg-purple-600 animate-shiver"
              >
                <div className='flex gap-3 justify-center items-center'>
                  <MdOutlineVideoCall />
                  Accept
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCallModal;