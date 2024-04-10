import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { followUsers, isFollowing, unFollowUsers } from '../../../services/User/apiMethods';
import AddVerifiedModal from '../Razorpay/VerifyModal';
import './notify.css'
import moment from 'moment';

function Notification({ notify,notifyClose }) {

    const {user} = useSelector((state)=>state.auth)
    const [remove, setRemove] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [openVerify,setOpenVerify]=useState(false)


    useEffect(()=>{
      if(!notify.postId){
        isFollowing(notify.from._id)
          .then((response)=>{
           setFollowed(response)
          })
          .catch((error)=>{
            setFollowed(false)
          })
      }
    },[])
   


    const handleFollow = () => {
        followUsers(notify.from._id)
          .then((response) => {
            setFollowed(true);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const handleUnFollow = () => {
        unFollowUsers(notify.from._id)
          .then((response) => {
            setFollowed(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const handlePayment =()=>{
        setOpenVerify(true)
      }


    return (
        <li className="flex items-center justify-between py-2">
            {openVerify && <AddVerifiedModal isOpen={openVerify} closeModal={()=>setOpenVerify(false)} user={user} notifyClose={notifyClose}/>}
        <div className="flex items-center">
            <img className="h-8 w-8 rounded-full cursor-pointer" src={notify.from.profilePic} alt={notify.notifyName} />
            
            {notify.verified && (
                <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                    <path d="M20.396..."></path>
                </svg>
            )}
            <div className="ml-3 "> {/* Add flex-shrink-0 to prevent shrinking */}
            <span className="cursor-pointer">
  <span style={{ fontWeight: 'bold', color: 'black' }}>{notify.fromUser},</span> {notify.message}
  <p className="text-gray-500 text-xs">{moment(notify.createdAt).fromNow()}</p>
</span>

            </div>
        </div> 
        {notify.fromUser !== 'Admin' ? (
    <div>
        {notify.postId ? (
            <div className="post-image flex-end">
                <img src={notify.postId.image} alt="Post" className="post-image-small" />
            </div>
        ) : (
            <div>
                {notify.from.isPrivate && followed ? (
                    <span className="text-gray-500 text-sm">Requested</span>
                ) : followed ? (
                    <button className="text-blue-500 px-3 py-1 rounded-md hover:text-dark-600 focus:outline-none text-sm" onClick={handleUnFollow}>
                        Unfollow
                    </button>
                ) : (
                    <button className="text-blue-500 px-3 py-1 rounded-md hover:text-dark-600 focus:outline-none text-sm" onClick={handleFollow}>
                        Follow
                    </button>
                )}
               
            </div>
        )}
    </div>
) : (
    <button className="text-blue-500 px-3 py-1 rounded-md hover:text-dark-600 focus:outline-none text-sm" onClick={handlePayment}>
        Pay
    </button>
)}


    </li>
    

    );
}

export default Notification;
