import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../../../features/admin/adminSlice';

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(reset())
        navigate('/admin')
    }
    return (
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
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



            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link to="/admin/dashboard" className="flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path d="M16 14.9394C17.6569 13.2825 18.6667 11.1206 18.6667 8.83333C18.6667 5.92706 16.3729 3.66667 13.5 3.66667C10.6271 3.66667 8.33333 5.92706 8.33333 8.83333C8.33333 11.1206 9.34315 13.2825 11 14.9394" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 22V19C1 17.9391 1.42143 16.9217 2.17157 16.1716C2.92172 15.4214 3.93913 15 5 15H9.58579C9.82748 15.0004 10.0635 15.0787 10.25 15.2266L12 16.5586L13.75 15.2266C13.9365 15.0787 14.1725 15.0004 14.4142 15H19C20.0609 15 21.0783 15.4214 21.8284 16.1716C22.5786 16.9217 23 17.9391 23 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium">Dashboard</span>
                    </Link>

                    <Link to="/admin/userlist" className="flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path d="M16 14.9394C17.6569 13.2825 18.6667 11.1206 18.6667 8.83333C18.6667 5.92706 16.3729 3.66667 13.5 3.66667C10.6271 3.66667 8.33333 5.92706 8.33333 8.83333C8.33333 11.1206 9.34315 13.2825 11 14.9394" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 22V19C1 17.9391 1.42143 16.9217 2.17157 16.1716C2.92172 15.4214 3.93913 15 5 15H9.58579C9.82748 15.0004 10.0635 15.0787 10.25 15.2266L12 16.5586L13.75 15.2266C13.9365 15.0787 14.1725 15.0004 14.4142 15H19C20.0609 15 21.0783 15.4214 21.8284 16.1716C22.5786 16.9217 23 17.9391 23 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium">Users</span>
                    </Link>

                    <Link to="/admin/kyc" className="flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="mx-4 font-medium">Kyc Verifications</span>
                    </Link>


                    <Link to="/admin/reports" className="flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="mx-4 font-medium">Reports</span>
                    </Link>


                    <a onClick={handleLogout} className=" cursor-pointer flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="mx-4 font-medium">Logout</span>
                    </a>


                    {/* Other navigation links */}

                </nav>




            </div>
        </aside>
    );
}

export default Sidebar;
