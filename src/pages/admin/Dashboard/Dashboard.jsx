import React, { useEffect } from 'react'
import Sidebar from '../../../components/Admin/SideBar/SideBar'
import TopCards from './TopCards'
import Users from './Users'
import Chart from './Chart'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Earnings from './Earnings'


function Dashboard() {

  const { admin } = useSelector((state) => state.admin)
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate('/admin')
    }
  })


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <TopCards />
        <div className='ml-7'>
          <Users />
        </div>
        <Chart />

      </div>
    </div>
  )
}

export default Dashboard
