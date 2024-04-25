import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AiFillHeart, AiOutlineComment, AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import CommentModal from '../Comments/Comment';
import EditPost from '../Modals/EditPost';
import { getCommentCount } from '../../../services/User/apiMethods';
import LikedUsers from '../LikedUsers/LikedUsers';


import DeleteConfirm from '../Modals/DeleteConfirm';



function MyPost({ post }) {
  const [isEditPost, setIsEditPost] = useState(false);
  const [showComments, setShowComments] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [likeCount, setLikeCount] = useState(0)
  const [openLiked, setOpenLiked] = useState(false)
  const handleShowLiked = () => {
    setOpenLiked(!openLiked)
  }
  useEffect(() => {
    getCommentCount(post._id)
      .then((response) => {


        setCommentCount(response.commentCount)
        setLikeCount(response.likeCount)

      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  const toggleEditModal = () => {
    setIsEditPost(!isEditPost)
  }

  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setOpenConfirm(!openConfirm);
  };

  const toggleComment = () => {

    setShowComments(!showComments)
  }


  return (
    <>
      <div>
        {openLiked && <LikedUsers isOpen={openLiked} toggleModal={handleShowLiked} postId={post._id} />}
        {showComments && <CommentModal isOpen={showComments} onClose={toggleComment} post={post} />}
        <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={post.image} alt="" />
        <div className="mt-8">
          <span className="text-blue-500 uppercase">{post.userId.userName}</span>
          <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{post.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div>
              <a href="#" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">{post.userId.userName}</a>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center space-x-1">
                <AiFillHeart onClick={() => handleShowLiked(post._id)} className="h-6 w-6 text-gray-400 cursor-pointer" />
                <span className="text-gray-400">{likeCount}</span>
                <div onClick={toggleComment}>
                  <AiOutlineComment className="h-6 w-6 text-gray-400 cursor-pointer" />
                </div>
                <span className="text-gray-400">{commentCount}</span>
              </div>
              <div className="relative">
                <div className="relative inline-block">
                  {/* Dropdown toggle button */}
                  <button
  onClick={toggleDropdown}
  className="relative z-0 block p-2 text-gray-700 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none"
  style={{ zIndex: 1 }} 
>
  <svg
    className={`w-5 h-5 text-${isOpen ? 'white' : 'gray-800'} dark:text-white`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
</button>


                  {/* Dropdown menu */}
                  {isOpen && (
  <div
    onClick={() => setIsOpen(false)}
    className="fixed inset-0 z-10 bg-black bg-opacity-50"
  ></div>
)}
<div
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-80 py-6 px-8 bg-white rounded-md shadow-xl dark:bg-gray-800 ${isOpen ? 'block' : 'hidden'
    }`}
>
  {/* Close button */}
  <button
    onClick={() => setIsOpen(false)}
    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
  {/* Modal content */}
  <div className="text-center">
    <button
      onClick={toggleEditModal}
      className="block w-full px-4 py-3 text-sm text-gray-600 capitalize transition-colors text-left duration-300 transform hover:bg-gray-100"
    >
      Edit
    </button>
    <button
      onClick={toggleModal}
      className="block w-full px-4 py-3 text-sm text-red-600 capitalize transition-colors text-left duration-300 transform hover:bg-gray-100"
    >
      Delete
    </button>
  </div>
</div>


                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {openConfirm && <DeleteConfirm isOpen={openConfirm} onClose={toggleModal} postId={post._id} />}

      {isEditPost && <EditPost isOpen={isEditPost} onClose={toggleEditModal} post={post} />}
    </>

  );
}

export default MyPost;
