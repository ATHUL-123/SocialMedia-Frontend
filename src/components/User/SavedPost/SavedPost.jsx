import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AiFillHeart, AiOutlineComment, AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import CommentModal from '../Comments/Comment';
import EditPost from '../Modals/EditPost';
import { getCommentCount, removeSaved } from '../../../services/User/apiMethods';
import DeleteConfirm from '../Modals/DeleteConfirm';
import LikedUsers from '../LikedUsers/LikedUsers';
function SavedPost({ saved, setSavedPosts }) {
  const [isEditPost, setIsEditPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openLiked, setOpenLiked] = useState(false)
  const handleShowLiked = () => {
    setOpenLiked(!openLiked)
  }
  console.log('savedddddddd', saved);
  useEffect(() => {

    getCommentCount(saved.postId._id)
      .then((response) => {
        setCommentCount(response.commentCount);
        setLikeCount(response.likeCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleEditModal = () => {
    setIsEditPost(!isEditPost);
  };

  const formattedDate = format(new Date(saved.createdAt), 'MMMM dd, yyyy');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setOpenConfirm(!openConfirm);
  };

  const toggleComment = () => {
    setShowComments(!showComments);
  };

  const handleUnsave = () => {
    removeSaved(saved._id)
      .then((response) => {
        // Update the saved posts state by removing the deleted post
        setSavedPosts((prevSavedPosts) =>
          prevSavedPosts.filter((post) => post._id !== saved._id)
        );
        console.log('Unsaved post:', saved._id);
        console.log('Response:', response);
      })
      .catch((error) => {
        console.error('Error while unsaving:', error);
        // Handle errors
      });
  };



  return (
    <>
      <div>
        {openLiked && <LikedUsers isOpen={openLiked} toggleModal={handleShowLiked} postId={saved.postId._id} />}
        {showComments && <CommentModal isOpen={showComments} onClose={toggleComment} post={saved.postId} />}
        <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={saved.postId.image} alt="" />
        <div className="mt-8">
          <span className="text-blue-500 uppercase">{ }</span>
          <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{saved.postId.title}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{saved.postId.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div>
              <a href="#" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">{ }</a>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center space-x-1">
                <AiFillHeart onClick={() => handleShowLiked(saved.postId._id)} className="h-6 w-6 text-gray-400 cursor-pointer" />
                <span className="text-gray-400">{likeCount}</span>
                <div onClick={toggleComment}>
                  <AiOutlineComment className="h-6 w-6 text-gray-400 cursor-pointer" />
                </div>
                <span className="text-gray-400">{commentCount}</span>
              </div>
              <div className="relative">
                <div className="relative inline-block">
                  {/* Unsave button */}
                  <button onClick={handleUnsave} className="text-gray-400 hover:text-red-600 focus:outline-none">
                    Unsave
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openConfirm && <DeleteConfirm isOpen={openConfirm} onClose={toggleModal} postId={saved.postId._id} />}
      {isEditPost && <EditPost isOpen={isEditPost} onClose={toggleEditModal} post={saved.postId} />}
    </>
  );
}

export default SavedPost;
