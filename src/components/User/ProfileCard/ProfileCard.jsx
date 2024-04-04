import React, { useState } from 'react';
import EditProfile from '../Modals/EditProfile';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import FollowingList from '../Modals/FollowingList';
import SettingsModal from '../Modals/SettingsModal';
import FollowerList from '../Modals/FollowerModal';
import RequestModal from '../Modals/RequestModal';
import { VscVerifiedFilled } from "react-icons/vsc";

import AddVerifiedModal from '../Razorpay/VerifyModal';
import RemoveConfirm from '../Modals/RemoveVerify';


function ProfileCard({user,posts}) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isEditModal,setIsModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [openSettings,setOpenSettings] = useState(false)
    const [followingModal,setFollowingModal] = useState(false)
    const [followersModal,setFollowersModal] = useState(false)
    const [request,setRequest]=useState(false)
    const [VerifyModal,setVerifyModal] =useState(false)
    const [removeVerify, setRemoveVerify] = useState(false);
     
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const toggleModal  =()=>{
      setIsModal(!isEditModal)
    }

    const logoutUser =()=>{
        dispatch(logout())
          navigate('/login')
       
    }

    const handleOpenRemoveModal = () => {
      setRemoveVerify(true);
    };
  
    const handleCloseRemoveModal = () => {
      setRemoveVerify(false);
    };
  
    
 
    if (!user) {
      return <div>Loading...</div>; 
    }
  
  return (
    <>
    {removeVerify && <RemoveConfirm isOpen={removeVerify} onClose={handleCloseRemoveModal} />}
 {followersModal && <FollowerList  isOpen={followersModal} toggleModal={()=>setFollowersModal(!followersModal)}/>}    
 {followingModal && <FollowingList  isOpen={followingModal} toggleModal={()=>setFollowingModal(!followingModal)} /> } 
 {VerifyModal && <AddVerifiedModal isOpen={VerifyModal} closeModal={()=>setVerifyModal(false)} user={user}/>}
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
  <div className="px-9 pt-9 flex-auto mt-20 min-h-[70px] pb-0 bg-transparent">
    <div className="flex flex-wrap mb-6 xl:flex-nowrap">
      <div className="mb-5 mr-5">
        <div className="relative inline-block shrink-0 rounded-2xl">
          <img className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]" src={user.profilePic} alt="image" />
          <div className="group/tooltip relative">
            <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white"></span>
            <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block"> Status: Active </span>
          </div>
        </div>
      </div>
      <div className="grow">
        <div className="flex flex-wrap items-start justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
           
  <span className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
    {user.userName}
  </span>

  <span className="text-sm text-gray-500 block">
    {user.name}
  </span>
  
   {user.verified && <svg
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                      fill="#1d9bf0"
                    ></path>
                  </svg>}

            </div>
           
            <div className="flex flex-wrap pr-2 mb-4 font-medium">
         

  <div className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
    <span className="mr-1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    </span>{user.email}
  </div>
</div>
<div>
<span className='text-secondary-dark hover:text-primary font-bold'>Bio</span>


<div className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
  
    <div className="flex flex-col">
      <span className="truncate max-w-[150px]">{user.bio}</span>
    </div>
  </div>
</div>

          </div>
          
          <div className="flex flex-wrap my-auto">
            <div className="relative inline-block">
              {/* Dropdown toggle button */}
              <button
                onClick={toggleDropdown}
                className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isOpen && (
              <div
              onClick={toggleDropdown}
              className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl"
            >
              <a
                onClick={toggleModal}
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Edit Profile
              </a>
              <a
                onClick={() => setOpenSettings(true)}
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Settings
              </a>
              {!user.verified ? (
  <a onClick={() => setVerifyModal(true)} className="inline-block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100" style={{ display: 'flex', alignItems: 'center' }}>
    Get Verified <span style={{ marginLeft: '5px' }}><VscVerifiedFilled /></span>
  </a>
) : (
  <a
  onClick={handleOpenRemoveModal}
  className="inline-block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
  style={{ display: 'flex', alignItems: 'center' }}
>
  Remove verification<span style={{ marginLeft: '5px' }}><VscVerifiedFilled /></span>
</a>
)}




              <hr className="border-gray-200" />
              <a
                href="#"
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Help
              </a>
              <a
                onClick={logoutUser}
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Sign Out
              </a>
            </div>
            
             
              )}
            </div>
            <a href="javascript:void(0)" className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-primary hover:bg-primary-dark active:bg-primary-dark focus:bg-primary-dark "> Hire </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
  <div className="flex flex-wrap items-center">
    <a onClick={() => setFollowingModal(true)} className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal cursor-pointer">320 Following</a>
    <a onClick={()=>setFollowersModal(true)} className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal cursor-pointer">2.5k Followers</a>
    <a onClick={()=>setRequest(true)}  className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal cursor-pointer">Request</a>
  </div>
</div>

      </div>
    </div>
  </div>
</div>
{request && <RequestModal isOpen={request} closeModal={()=>setRequest(false)}/>}
{openSettings && <SettingsModal isOpen={openSettings} closeModal={() => setOpenSettings(false)} user={user} />}

      <EditProfile isOpen={isEditModal} toggleModal={toggleModal}/>
    </>
  )
}

export default ProfileCard