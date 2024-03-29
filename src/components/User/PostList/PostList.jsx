// PostList.js
import React, { useEffect, useState } from 'react';
import { LikePost, unLikePost } from '../../../services/User/apiMethods';
import { format } from 'date-fns';
import DropdownMenu from './DropDown'; // Import the DropdownMenu component
import CommentModal from '../Comments/Comment';
import './PostList.css';
import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';

const PostList = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [totalLikes, setTotalLikes] = useState(post.likes.length);
  const [dropDown, setDropDown] = useState(false);
  const [openComment,setOpenComment] = useState(false)

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  useEffect(()=>{
    console.log('isisi');
    console.log(post);
  },[])

  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    LikePost(post._id)
      .then(response => {
        setTotalLikes(totalLikes + 1);
      })
      .catch(error => {
        setIsLiked(!newLikeState);
        console.log(error);
      });
  };

  const handleUnlike = () => {
    unLikePost(post._id)
      .then(response => {
        setIsLiked(!isLiked);
        setTotalLikes(totalLikes - 1);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <div className="bg-white mt-10 w-full md:w-2/3 overflow-hidden rounded-lg relative">
    {dropDown && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-10"
        onClick={() => setDropDown(false)}
      ></div>
    )}
  
    <DropdownMenu isOpen={dropDown} toggleDropdown={toggleDropdown} postId={post._id} />
  
    <div className="flex flex-wrap my-auto justify-between">
    <div className="flex items-center p-3">
  <img
    className="w-12 h-12 rounded-full mr-3"
    src={post.userId.profilePic}
    alt="User Profile"
  />
  <div className='flex flex-wrap my-auto justify-between'>
   
    <p className="text-lg font-semibold text-gray-800">
      {post.userId.userName}
    </p>
    {post.userId.verified && 
      <svg
        viewBox="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-1"
      >
        <path
          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
          fill="#1d9bf0"
        ></path>
      </svg>
    }
  </div>
 
</div>

  
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          className="absolute top-0 right-0 p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    
    </div>
    <div className='ms-20' style={{ marginTop: '-1rem',marginLeft:'4.2rem' }}>
    <p className="text-sm ms-1 text-gray-600">{formattedDate}</p>
</div>


    <img
      className="border rounded-t-lg shadow-lg w-full"
      src={post.image}
      alt="Post"
    />
    <div className="bg-white border shadow p-3 text-xl text-gray-700 font-semibold">
      {post.description}
  
      {totalLikes > 3 && (
        <p style={{ fontSize: 'small' }}>
          <span style={{ fontWeight: 'bold' }}>{post.likes[0].userName}</span> and {totalLikes - 2} other people liked this post
        </p>
      )}
    </div>
  
    <div className="bg-white p-1 border shadow flex flex-row flex-wrap rounded-b-lg">
      <div
        onClick={isLiked ? handleUnlike : handleLike}
        className={`w-1/3 hover:bg-gray-100 flex items-center justify-center text-lg font-semibold cursor-pointer transition-colors duration-300 ease-in-out ${isLiked ? 'text-blue-500' : 'text-gray-700'
          }`}
      >
        <span className="inline-flex items-center">
          {isLiked ? <FaThumbsUp className="mr-1" /> : <FaThumbsUp className="far mr-1" />}
          <span>Like</span>
        </span>
      </div>
      <div
        className="w-1/3 hover:bg-gray-100 border-l-4 border-r flex items-center justify-center text-lg text-gray-700 font-semibold cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <span className="inline-flex items-center">
          <FaShare className="mr-1" />
          <span>Save</span>
        </span>
      </div>
      <div
        onClick={() => setOpenComment(true)}
        className="w-1/3 hover:bg-gray-100 border-l-4 flex items-center justify-center text-lg text-gray-700 font-semibold cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <span className="inline-flex items-center">
          <FaCommentAlt className="mr-1" />
          <span>Comment</span>
        </span>
      </div>
    </div>
    {openComment && <CommentModal isOpen={openComment} onClose={() => setOpenComment(false)} post={post} />}
  </div>
  
  );
};

export default PostList;
