import React from 'react';

const Sidebar = () => {
    return (
        <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a href="#">
                <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="" />
            </a>

            <div className="relative mt-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <a className="flex mt-5 items-center px-4 py-2 text-gray-700  rounded-md dark:bg-gray-800 dark:text-gray-200 highlight-link" href="#">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium">Dashboard</span>
                    </a>

                    <a className="flex mt-5 items-center px-4 py-2 text-gray-700  bg-gray-100  rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path d="M16 14.9394C17.6569 13.2825 18.6667 11.1206 18.6667 8.83333C18.6667 5.92706 16.3729 3.66667 13.5 3.66667C10.6271 3.66667 8.33333 5.92706 8.33333 8.83333C8.33333 11.1206 9.34315 13.2825 11 14.9394" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 22V19C1 17.9391 1.42143 16.9217 2.17157 16.1716C2.92172 15.4214 3.93913 15 5 15H9.58579C9.82748 15.0004 10.0635 15.0787 10.25 15.2266L12 16.5586L13.75 15.2266C13.9365 15.0787 14.1725 15.0004 14.4142 15H19C20.0609 15 21.0783 15.4214 21.8284 16.1716C22.5786 16.9217 23 17.9391 23 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium">Users</span>
                    </a>

                    <a className="flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium">Posts</span>
                    </a>
                    
                    <a className="flex mt-5 items-center px-4 py-2 text-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="mx-4 font-medium">Reports</span>
                    </a>

                    {/* Other navigation links */}

                </nav>



                <a href="#" className="flex items-center px-4 -mx-2">
                    <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                    <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">John Doe</span>
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;
