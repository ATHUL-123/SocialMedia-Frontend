import React from 'react'
import Sidebar from '../../../components/Admin/SideBar/SideBar'
import PeopleList from '../../../components/Admin/KycList/KycList'


function KycVerifications() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        
      <PeopleList/>
      </div>
    </div>
  )
}

export default KycVerifications