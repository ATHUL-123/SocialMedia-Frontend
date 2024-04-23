import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SideProfile.css'
import { FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { logout } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import SettingsModal from '../Modals/SettingsModal';
const SideProfile = ({ user }) => {

  const dispatch = useDispatch()
  const [openSettings, setOpenSettings] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user.profilePic) {
      navigate('/login')
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }


  return (
    <aside className="flex flex-col mt-20 mr-10 ml-10 w-64 h-screen h-3/4 px-4 py-12 bg-gradient-to-b from-blue-100 to-blue-200 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 rounded-lg">
      {openSettings && <SettingsModal isOpen={openSettings} closeModal={() => setOpenSettings(false)} user={user} />}
      <div className="flex items-center">
        <svg

          xmlns="http://www.w3.org/2000/svg"
          className=" ml-10 h-6 w-6 text-black mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <a href="#" className="  text-blue-800 font-semibold text-lg">
          HYPER EDGE
        </a>
      </div>

      <div className="flex flex-col items-center mt-6 -mx-2">
        <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user.profilePic} alt="avatar" />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.userName}</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-10">
        <nav>
          <Link to="/profile" className="nav-link flex items-center">
            <FaUserCircle className="mr-2" />
            <span>Profile</span>
          </Link>
          <Link onClick={() => setOpenSettings(true)} className="nav-link flex items-center">
            <IoIosSettings className="mr-2" />
            <span>Settings</span>
          </Link>
          <Link to="/chat" className="nav-link flex items-center">
            <CiSaveDown2 className="mr-2" />
            <span>Messenger</span>
          </Link>
          <Link onClick={handleLogout} className="nav-link flex items-center">
            <RiLogoutBoxRFill className="mr-2" />
            <span>Logout</span>
          </Link>
        </nav>
      </div>


    </aside>


  )
}

export default SideProfile