import React,{useEffect} from 'react'
import Sidebar from '../../../components/Admin/SideBar/SideBar'
import UsersList from '../../../components/Admin/UsersList/UsersList'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Dashboard() {
 
  const {admin} = useSelector((state)=>state.admin)
  const navigate = useNavigate()

 useEffect(()=>{
   if(!admin){
    navigate('/admin')
   }
 })


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <UsersList />
      </div>
    </div>
  )
}

export default Dashboard
