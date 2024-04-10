import React, { useEffect, useState } from 'react';
import Conversation from './Conversation';
import { useSelector } from 'react-redux';
import { getAllConversations } from '../../../services/User/apiMethods';

const ChatList = ({ setCurrentChat }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch conversations data
    getAllConversations()
      .then((response) => {
        setConversations(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Function to handle conversation click
  const handleConversationClick = (conversation) => {
    setCurrentChat(conversation);
  };

  return (
<>
    {loading ? (
      // Render loading indicator while data is being fetched
      <div>Loading...</div>
    ) : (
    <div className="relative flex flex-col h-[90vh] bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out" style={{ width: '24rem', marginTop: '4rem', overflowY: 'hidden' }}>
    <div className="flex justify-between px-3 pt-1 text-white">
      <div className="flex items-center w-full py-2">
        <button aria-haspopup="true" className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200">
          <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fillRule="nonzero" d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"/>
          </svg>
        </button>
        <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
              </svg>
            </button>
          </span>
          <input type="search" name="q"
            className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
            placeholder="Search..." autoComplete="off"
          />
        </div>
      </div>
    </div>
    <div className="border-b shadow-bot">
      <ul className="flex flex-row items-center inline-block px-2 list-none select-none">
        {/* Navigation items */}
      </ul>
    </div>
    <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
  <ul className="flex flex-col inline-block w-full h-screen px-2 select-none">
   
  {conversations.map((conversation) => (
      <div onClick={()=>handleConversationClick(conversation)}>
          <Conversation key={conversation._id} conversation={conversation} />
      </div>
      
      ))}
  </ul>
</div>

    <div className="fixed absolute bottom-0 right-0 z-40 mb-6 mr-4">
      <button className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink">
        <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fillRule="nonzero"
            d="M3,17.46 L3,20.5 C3,20.78 3.22,21 3.5,21 L6.54,21 C6.67,21 6.8,20.95 6.89,20.85 L17.4562847,10.2933914 C17.6300744,10.1200486 17.6494989,9.85064903 17.514594,9.65572084 L17.4564466,9.58644661 L17.4564466,9.58644661 L14.4135534,6.54355339 C14.2186247,6.40864848 13.9492251,6.42807296 13.7754644,6.60183372 L3.5,16.878 L3.5,14.45 L7,11 L11,14.5 L8.55,18 L6,18 L3.5,15.5 L3.5,17.46 Z"/>
        </svg>
      </button>
    </div>
  </div> )}
</>
  );
};

export default ChatList;
