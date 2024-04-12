import React from 'react'

function MypostSkelton() {
  return (
    <>
    <div className="animate-pulse">
      {/* Shimmer effect for the image */}
      <div className="h-64 bg-gray-300 rounded-lg lg:h-80"></div>
      <div className="mt-8">
        {/* Shimmer effect for user name */}
        <div className="h-6 w-36 bg-gray-300 mb-4"></div>
        {/* Shimmer effect for title */}
        <div className="h-6 w-80 bg-gray-300 mb-2"></div>
        {/* Shimmer effect for description */}
        <div className="h-4 w-96 bg-gray-300 mb-4"></div>
        <div className="flex items-center justify-between">
          <div>
            {/* Shimmer effect for user name */}
            <div className="h-4 w-20 bg-gray-300"></div>
            {/* Shimmer effect for date */}
            <div className="h-4 w-24 bg-gray-300"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center space-x-1">
              {/* Shimmer effect for heart icon */}
              <div className="h-6 w-6 bg-gray-300"></div>
              {/* Shimmer effect for like count */}
              <div className="h-4 w-6 bg-gray-300"></div>
              {/* Shimmer effect for comment icon */}
              <div className="h-6 w-6 bg-gray-300"></div>
              {/* Shimmer effect for comment count */}
              <div className="h-4 w-6 bg-gray-300"></div>
            </div>
            <div className="relative">
              {/* Shimmer effect for dropdown button */}
              <div className="h-6 w-6 bg-gray-300"></div>
              {/* Shimmer effect for dropdown menu */}
              <div className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-gray-300 rounded-md shadow-xl">
                {/* Shimmer effect for dropdown menu items */}
                <div className="h-10 w-full bg-gray-300 mb-2"></div>
                <div className="h-10 w-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default MypostSkelton