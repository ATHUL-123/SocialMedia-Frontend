import React,{useState} from 'react'
import UserBlockModal from '../Modals/UserBlockModal'
function TableData({ user,updatedUsers }) {

    const [isOpen,setIsOpen] = useState(false)
    
    const toggleModal=()=>{
        setIsOpen(!isOpen)
    }
    

    
   

    
    return (
        <tr>
            <td class="py-4 px-4 whitespace-nowrap">
                <div class="flex items-center">
                    <img src={user.profilePic} alt="Profile" class="h-10 w-10 rounded-full" /> {/* Profile picture */}
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">{user.userName}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                </div>
            </td>

            {user.blocked ? 
            <td class="py-4 px-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100">
                Inactive
            </span>
        </td> : 
         
         <td class="py-4 px-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100">
                    Active
                </span>
            </td> 

}
            <td class="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Developer</td>
            <td class="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.phone}</td>
            <td class="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Team A, Team B</td>
            <td class="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Profile</button>
                {user.blocked ?
                    <button onClick={toggleModal} class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">UnBlock</button>
                    :
                    <button onClick={toggleModal} class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Block</button>
                }
            </td>
               <UserBlockModal isOpen={isOpen} closeModal={toggleModal} updatedUsers={updatedUsers} userId={user._id}/>
        </tr>

    )
}

export default TableData