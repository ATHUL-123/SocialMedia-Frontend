import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { AiFillHeart, AiOutlineComment, AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import CommentModal from '../Comments/Comment';
import EditPost from '../Modals/EditPost';
import { getCommentCount} from '../../../services/User/apiMethods';
import DeleteConfirm from '../Modals/DeleteConfirm';

function TaggedPost({ post ,setTaggedPost}) {

  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);


  useEffect(() => {
    
    getCommentCount(post._id)
      .then((response) => {
        setCommentCount(response.commentCount);
        setLikeCount(response.likeCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const formattedDate = format(new Date(post.createdAt), 'MMMM dd, yyyy');


  const toggleComment = () => {
    setShowComments(!showComments);
  };


  


  return (
    <>
      <div>
        {showComments && <CommentModal isOpen={showComments} onClose={toggleComment} post={post} />}
        <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={post.image} alt="" />
        <div className="mt-8">
          <span className="text-blue-500 uppercase">{}</span>
          <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{post.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div>
              <a href="#" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">{}</a>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center space-x-1">
                <AiFillHeart className="h-6 w-6 text-gray-400 cursor-pointer" />
                <span className="text-gray-400">{likeCount}</span>
                <div onClick={toggleComment}>
                  <AiOutlineComment className="h-6 w-6 text-gray-400 cursor-pointer" />
                </div>
                <span className="text-gray-400">{commentCount}</span>
              </div>
            
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default TaggedPost;
