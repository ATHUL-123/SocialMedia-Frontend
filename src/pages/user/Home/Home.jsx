import React, { useEffect } from 'react';
import Header from '../../../components/User/Header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../../features/post/postSlice';
import { useDispatch} from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import PostItem from '../../../components/User/PostList/PostList';
import Spinner from '../../../components/User/Spinner/Spinner';
import OnlinePeople from '../../../components/User/OnlinePeople/OnlinePeople';
import SideProfile from '../../../components/User/SideProfile/SideProfile';
import './Home.css'
import { toast } from 'react-toastify';

const Home = () => {
  
  const navigate = useNavigate()
  const {user}=useSelector((state)=>state.auth)
  const {posts,isLoading} = useSelector((state)=>state.post)
  const dispatch = useDispatch()


  useEffect(() => {
    if (!user || user.blocked) {
        dispatch(logout())
        navigate('/login');
    } else {
        dispatch(getPost());
    }
},[user, dispatch, navigate]);

  if(isLoading){
    return <Spinner/>
}
  return (
    <>
   <div>
        <Header/>
        <div className="w-full bg-indigo-100 h-screen flex flex-col md:flex-row justify-center overflow-hidden">
        <OnlinePeople/>
          <div className="flex-1 p-5 antialiased overflow-y-auto">
            {/* Removed md:w-4/5 and replaced with flex-1 */}
            <div className="mt-3 flex flex-col items-center">
              {/* Centered post items */}
              
    {posts.length > 0 ? (
        posts.map(post => (
            <PostItem key={post._id} post={post} />
        ))
    ) : (
        <p>You have no posts</p>
    )}


            </div>
          </div>
        {user && <SideProfile user={user}/>}
          
          
        </div>
      </div>
   
  </>
  );
};

export default Home;
