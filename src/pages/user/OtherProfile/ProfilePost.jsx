import React from 'react';
import { format } from 'date-fns';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';

function MyPost({ post,user }) {
  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <div>
  <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={post.image} alt="" />
  <div className="mt-8">
    <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h1>
    <p className="mt-2 text-gray-500 dark:text-gray-400 max-h-16 overflow-hidden">{post.description}</p>
    <div className="flex items-center justify-between mt-4">
      <div>
        <a href="#" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">{user.userName}</a>
        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center space-x-1">
          <AiFillHeart className="h-6 w-6 text-gray-400 cursor-pointer" />
          <span className="text-gray-400">10</span>
          <AiOutlineComment className="h-6 w-6 text-gray-400 cursor-pointer" />
          <span className="text-gray-400">20</span>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default MyPost;
