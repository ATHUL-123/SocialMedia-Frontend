import React, { useState,useEffect } from 'react';
import { followUsers, unFollowUsers,getConnectionCount } from '../../../services/User/apiMethods';

function UserProfile({ user, following }) {
  let initialFollowingState;
  

  const [followerCount,setFollowerCount] = useState(0)
  const [followingCount,setFollowingCount]=useState(0)

useEffect(()=>{
  if(user){
    getConnectionCount(user._id)
    .then((response)=>{
 
     setFollowerCount(response.followersCount)
     setFollowingCount(response.followingCount)
    })
  }
 
},[])


  // Determine the initial state of isFollowing based on the value of following
  if (following === 'requested') {

    initialFollowingState = 'requested';
  } else {

    initialFollowingState = following;
  }

  const [isFollowing, setFollowed] = useState(initialFollowingState);

  const handleFollow = () => {
    followUsers(user._id)
      .then((response) => {
        user.isPrivate?setFollowed('requested'):setFollowed(true)

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnFollow = () => {
    unFollowUsers(user._id)
      .then((response) => {
        setFollowed(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
        <div className="px-9 pt-9 flex-auto mt-20 min-h-[70px] pb-0 bg-transparent">
          <div className="flex flex-wrap mb-6 xl:flex-nowrap">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <img
                  className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                  src={user.profilePic}
                  alt="image"
                />
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-wrap items-start justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <span className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
                      {user.userName}
                    </span>
                    <span className="text-sm text-gray-500 block">{user.name}</span>
                  </div>
                  <div className="flex flex-wrap pr-2 mb-4 font-medium">
                    <div className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                      </span>
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary-dark hover:text-primary font-bold">Bio</span>
                    <div className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                      <div className="flex flex-col">
                        <span className="truncate max-w-[150px]">{user.bio}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap my-auto">
                  <div className="relative inline-block">
                    {/* Additional content */}
                  </div>
                  {/* Render the follow/unfollow button only if user is available */}
                  {user && (
  <>
    {user.isPrivate ? (
      isFollowing === 'requested' ? (
        <button
          className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-gray-400"
        >
          Requested
        </button>
      ) : (
        <>
          {isFollowing ? (
            <button
              className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-gray-400"
              onClick={handleUnFollow}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:bg-blue-700"
              onClick={handleFollow}
            >
              Follow
            </button>
          )}
        </>
      )
    ) : (
      <>
        {isFollowing ? (
          <button
            className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-gray-400"
            onClick={handleUnFollow}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:bg-blue-700"
            onClick={handleFollow}
          >
            Follow
          </button>
        )}
      </>
    )}
  </>
)}
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-wrap items-center">
             

    <a  className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal cursor-pointer">{followingCount} Following</a>
    <a  className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal cursor-pointer">{followerCount} Followers</a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
