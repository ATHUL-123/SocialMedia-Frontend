import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/User/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from '../../../components/User/Spinner/Spinner';
import { getPost } from '../../../features/post/postSlice';
import { logout } from '../../../features/auth/authSlice';
import ProfileCard from '../../../components/User/ProfileCard/ProfileCard';
import OnlinePeople from '../../../components/User/OnlinePeople/OnlinePeople';
import UsersList from '../../../components/User/UsersList/UsersList';
import Header from '../../../components/User/Header/Header'
import { fetchSaved } from '../../../services/User/apiMethods';
import SavedPost from '../../../components/User/SavedPost/SavedPost';
const MyPost = lazy(() => import('../../../components/User/MyPost/MyPost'));

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const [showUserList, setShowUserList] = useState(true);
  const [savedPosts,setSavdPosts]=useState([])

  useEffect(() => {
   
    if (!user || user.blocked) {
      dispatch(logout());
      navigate('/login');
    } else {
      dispatch(getPost());
    }
  }, [user, dispatch, navigate]);

  const [myPost, setMyPost] = useState(true);

  const [saved, setSaved] = useState(false);

  const onChangeMyPost = () => {
    setMyPost(true);
   setSaved(false);
  };

  const onChangeSaved = () => {
    fetchSaved()
    .then((response) => {
  
        setSavdPosts(response);
        setSaved(true);
        setMyPost(false);
    })
    .catch((error) => {
        setMyPost(true);
        setSaved(false);
    });
}

  
  return (
    <>
       <Header toggleSearch={()=>setShowUserList(!showUserList)}  />
      <Navbar />
      <div className="flex">
        <div className="w-1/4">
        <UsersList />
        </div>
        <div className="w-3/4">
          <ProfileCard user={user} posts={posts} />
          <div>
          
            <br />
            <div className="flex justify-center">
  <ul className="group flex flex-wrap items-stretch justify-between text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
    <li className="flex mt-2 -mb-[2px]">
      <span
        onClick={onChangeSaved}
        className="py-2 px-4 mr-1 sm:mr-3 lg:mr-10 cursor-pointer transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-marketing]:border-primary group-[.active-marketing]:text-primary text-black rounded-md hover:text-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        style={{ fontFamily: 'Courier New, sans-serif' }} // Adjust font family
      >
    
        Saved Post
      </span>
    </li>
    <li className="flex mt-2 -mb-[2px]">
      <span
        onClick={onChangeMyPost}
        className="py-2 px-4 mr-1 sm:mr-3 lg:mr-10 cursor-pointer transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-followers]:border-primary group-[.active-followers]:text-primary text-black rounded-md hover:text-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        style={{ fontFamily: 'Courier New, sans-serif' }} // Adjust font family
      >
   
        My Posts 
      </span>
    </li>
  </ul>
</div>
          </div>
          {/* Lazy load MyPost components using map */}
          <Suspense fallback={<Spinner />}>
            {myPost && (
              <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-1 mx-auto">
                  
                  <hr className="my-8 border-gray-200 dark:border-gray-700" />
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post, index) => (
                      <MyPost key={index} post={post} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </Suspense>
        
            {saved && (
              <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-1 mx-auto">
                  
                  <hr className="my-8 border-gray-200 dark:border-gray-700" />
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {savedPosts.map((post, index) => (
                      <SavedPost key={index} saved={post} setSavedPosts={setSavdPosts} />
                    ))}
                  </div>
                </div>
              </section>
            )}
         
        </div>
      </div>
    </>
  );
}

export default Profile;