import React from 'react'
import Sidebar from '../../../components/Admin/SideBar/SideBar'
import ReportList from '../../../components/Admin/ReportList/ReportList'


function Reports() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
      <ReportList/>
      </div>
    </div>
  )
}

export default Reports