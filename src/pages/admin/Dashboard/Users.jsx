import React, { useEffect, useState } from 'react'
import { getAvg,fetchAllKyc } from '../../../services/Admin/apiMethods'
import { Link } from 'react-router-dom';
function Users() {
  const [avgComments, setAvgComments] = useState(0);
  const [avgConnections, setAvgConnections] = useState(0);
  const [avgPost, setAvgPost] = useState(0);
  const [avgVerified, setAvgVerified] = useState(0);
  const [kycs,setKycs]=useState([])
  const [loading,setLoading]= useState(true)

  useEffect(()=>{
    setLoading(true)
      fetchAllKyc()
       .then((response)=>{

        setKycs(response)
        setLoading(false)
       })
       .catch(()=>{
        setLoading(true)
       })
   },[])

  useEffect(() => {

    getAvg()
      .then((res) => {
        setAvgComments(res.averageCommentsByPost)
        setAvgConnections(res.averageConnectionsByUser)
        setAvgPost(res.averagePostsByUser)
        setAvgVerified(res.averageVerifiedUsersByUsers)
      })
      .catch((err) => {
        console.log('err', err);
      })
  }, [])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
        <div className="rounded-t mb-0 px-0 border-0">
          <div className="flex flex-wrap items-center px-4 py-2">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Average</h3>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Role</th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Amount</th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Comments</th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{(avgComments).toFixed(2)}</td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{(avgComments * 10).toFixed(2)}%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                          <div style={{ width: `${(avgComments * 10).toFixed(2)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Connection</th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{(avgConnections).toFixed(2)}</td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{(avgConnections * 10).toFixed(2)}%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                          <div style={{ width: `${(avgConnections * 10).toFixed(2)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Post</th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{(avgPost).toFixed(2)}</td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{(avgPost * 10).toFixed(2)}%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                          <div style={{ width: `${(avgPost * 10).toFixed(2)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-100">
                  <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Verified User</th>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{(avgVerified).toFixed(2)}</td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{(avgVerified * 10).toFixed(2)}%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div style={{ width: `${(avgVerified * 10).toFixed(2)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Additional rows omitted for brevity */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
        <div className="flex justify-between mb-4 items-start">
          <div className="font-medium">Kyc Requets</div>
          <div className="dropdown">
            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
              </li>
              {/* Additional list items omitted for brevity */}
            </ul>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="w-full min-w-[540px]">
          {!loading && (
        <tbody>
{kycs.map((item, index) => (
  <tr key={index}>
    <td className="py-2 px-4 border-b border-b-gray-50">
      <div className="flex items-center">
        <Link to={'/admin/kyc'} className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">{item.userId.userName}</Link>
      </div>
    </td>
    <td className="py-2 px-4 border-b border-b-gray-50">
    <span className="text-[13px] font-medium text-gray-400">
  {new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })}
</span>

    </td>
    <td className="py-2 px-4 border-b border-b-gray-50">
      <span className="text-[13px] font-medium text-gray-400">{item.gender}</span>
    </td>
    <td className="py-2 px-4 border-b border-b-gray-50">
      {/* Render whatever content you want in this column */}
    </td>
  </tr>
))}


            
            </tbody>)}
          </table>
        </div>
      </div>
    </div>

  )
}

export default Users