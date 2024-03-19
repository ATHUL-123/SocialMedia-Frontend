import React from 'react';

import './PostList.css'
import { format } from 'date-fns';

const PostList = ({ post }) => {
  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
  return (
    <div className="bg-white mt-10 w-full md:w-2/3 overflow-hidden rounded-lg">
    <div className="flex items-center p-3">
      <img className="w-12 h-12 rounded-full mr-3" src={post.userId.profilePic} alt="User Profile" /> {/* Replace with actual user profile picture */}
      <div>
        <p className="text-lg font-semibold text-gray-800">{post.userId.userName}</p> {/* Replace with actual user name */}
        <p className="text-sm text-gray-600">{formattedDate}</p> {/* Replace with actual date posted */}
      </div>
    </div>
    <img className="border rounded-t-lg shadow-lg w-full" src={post.image} alt="Post" />
    <div className="bg-white border shadow p-3 text-xl text-gray-700 font-semibold">
      {post.description}
    </div>
    <div className="bg-white p-1 border shadow flex flex-row flex-wrap rounded-b-lg">
      <div className="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
      <div className="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
      <div className="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">Comment</div>
    </div>
  </div>
  
  
  );
};

export default PostList;
