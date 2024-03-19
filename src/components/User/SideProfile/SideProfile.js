import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const SideProfile = ({user}) => {

  const navigate = useNavigate()
  useEffect(()=>{
    if(!user.profilePic){
      navigate('/login')
     }
  },[])
 

  return (
    <aside className="flex flex-col mt-20 mr-10 ml-10 w-64 h-96 px-4 py-8 overflow-y-auto bg-gradient-to-b from-blue-100 to-blue-200 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 rounded-lg">
        <a href="#" className="mx-auto">
          <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" />
        </a>
  
        <div className="flex flex-col items-center mt-6 -mx-2">
          <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user.profilePic} alt="avatar" />
          <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.userName}</h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
  
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200" href="#">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG Path */}
              </svg>
              <Link to="/profile" className="mx-4 font-medium">
  <span>Dashboard</span>
</Link>
            </a>
  
            {/* Other navigation links */}
          </nav>
        </div>
      </aside>
  )
}

export default SideProfile