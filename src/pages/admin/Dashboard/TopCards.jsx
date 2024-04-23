
import React, { useState, useEffect } from 'react'
import { fetchCounts } from '../../../services/Admin/apiMethods';

function TopCards() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0)

  useEffect(() => {
    fetchCounts()
      .then((response) => {
        setUserCount(response.userCount);
        setConnectionCount(response.connectionCount);
        setPostCount(response.postCount)
      })
      .catch((error) => {
        console.log('errrrr', error);
      })
  })
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">{userCount}</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Users</div>
            </div>

          </div>
          <a href="/admin/userlist" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">{postCount}</div>
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">+30%</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Posts</div>
            </div>

          </div>
          {/* <a href="/dierenartsen" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a> */}
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">{connectionCount}</div>
              <div className="text-sm font-medium text-gray-400">Connections</div>
            </div>

          </div>
          {/* <a href="" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a> */}
        </div>
      </div>
    </div>
  )
}

export default TopCards