import React, { useState } from 'react';
import EditProfile from '../Modals/EditProfile';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


function ProfileCard({user,posts}) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isEditModal,setIsModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
     
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
  
    if (!user) {
      return <div>Loading...</div>; 
    }
  
  return (
    <>
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
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                  >
                    Keyboard Shortcuts
                  </a>
                  <hr className="border-gray-200" />
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                  >
                    Company Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
                  >
                    Invite Colleagues
                  </a>
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
            <a className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 320 Following </a>
            <a className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 2.5k Followers </a>
            <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 48 Deals </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <EditProfile isOpen={isEditModal} toggleModal={toggleModal}/>
    </>
  )
}

export default ProfileCard