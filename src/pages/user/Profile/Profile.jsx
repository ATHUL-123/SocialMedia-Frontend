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

const MyPost = lazy(() => import('../../../components/User/MyPost/MyPost'));

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const [showUserList, setShowUserList] = useState(true);

  useEffect(() => {
    if (!user || user.blocked) {
      dispatch(logout());
      navigate('/login');
    } else {
      dispatch(getPost());
    }
  }, [user, dispatch, navigate]);

  const [myPost, setMyPost] = useState(true);
  const [followers, setFollowers] = useState(false);

  const onChangeMyPost = () => {
    setMyPost(true);
    setFollowers(false);
  };

  const onChangeFollow = () => {
    setFollowers(true);
    setMyPost(false);
  };
  
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
            <hr className="w-full h-px border-neutral-200" />
            <br />
            <ul className="group flex flex-wrap items-stretch justify-between text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
              <li className="flex mt-2 -mb-[2px]">
                <button
                  onClick={onChangeFollow}
                  aria-controls="marketing"
                  className="py-2 px-4 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-marketing]:border-primary group-[.active-marketing]:text-primary text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                >
                  {' '}
                  Saved Post ({posts.length}){' '}
                </button>
              </li>
              <li className="flex mt-2 -mb-[2px]">
                <button
                  onClick={onChangeMyPost}
                  aria-controls="followers"
                  className="py-2 px-4 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-followers]:border-primary group-[.active-followers]:text-primary text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                >
                  {' '}
                  My Posts ({posts.length}){' '}
                </button>
              </li>
            </ul>
            <br />
            <hr className="w-full h-px border-neutral-200" />
          </div>
          {/* Lazy load MyPost components using map */}
          <Suspense fallback={<Spinner />}>
            {myPost && (
              <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                      recent posts
                    </h1>
                    <button className="focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
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
        </div>
      </div>
    </>
  );
}

export default Profile;