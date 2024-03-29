import React from 'react'

const OnlinePeople = () => {
  return (
<div className="h-80vh py-8 px-10 overflow-y-auto ml-10 mt-10 bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
  <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Online</h2>

  <div className="mt-8 space-y-4">
    <button className="flex items-center w-full py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
      <div className="relative">
        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-white rounded-full"></div>
      </div>

      <div className="text-left rtl:text-right">
        <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">Mia John</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">11.2 Followers</p>
      </div>
    </button>

    {/* Other account buttons */}
  </div>
</div>

  )
}

export default OnlinePeople