import React, { useEffect, useState } from 'react';
import { addComment, getAllComments, deleteComment, replyComment, fetchReplies } from '../../../services/User/apiMethods';
import { useSelector } from 'react-redux';
import { FaTrashAlt, FaReply } from 'react-icons/fa'; // Import the reply icon
import moment from 'moment';
import { useSocket } from '../../../utils/SocketContext';
import './Comment.css';

const CommentModal = ({ isOpen, onClose, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // State to store new comment
  const [replyTo, setReplyTo] = useState(null); // State to store the comment ID to which the user is replying
  const { user } = useSelector((state) => state.auth);
  const [showReply, setShowReply] = useState(false)
  const [replies, setReplies] = useState([])
  const [add, setAdd] = useState(false)
  const socket = useSocket()


  // Function to retrieve comments when the component mounts or when the comments state changes
  useEffect(() => {
    getAllComments(post._id)
      .then((response) => {

        setComments(response.comments);
      })
      .catch((error) => console.error(error));
  }, [post._id, add]);

  // Function to handle change in the new comment input field
  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };


  // Function to handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const data = {
        content: newComment,
        userName: user.userName,
        userId: user._id,
        postId: post._id,
      };
      addComment(post._id, data)
        .then(() => {
          setNewComment('')
         ;
          socket.current.emit('notification-sent', { message: 'Commented on your Post', senderId: user._id, recieverId: post.userId._id })
         
          setAdd(!add)
        })
        // Clear the input field after successful comment addition

        .catch((error) => console.error(error));

    }

  };

  // Function to handle replying to a comment
  const handleReply = (commentId, userName) => {
    setReplyTo(commentId);
    setNewComment(`@${userName}__`);
  };

  // Function to handle canceling reply mode
  const handleCancelReply = () => {
    setReplyTo(null);
    setNewComment('');
  };

  // Function to handle submitting a reply
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '' && replyTo) {
      const data = {
        content: newComment,
        userName: user.userName,
        userId: user._id,
        postId: post._id,

      };
      replyComment(replyTo, data)
        .then(() => {
          setNewComment(''); // Clear the input field after successful reply
          setReplyTo(null); // Reset the replyTo state
        })
        .catch((error) => console.error(error));
    }
    setAdd(!add)
  };

  const handleCloseModal = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        // Filter out the deleted comment from the comments state
        const updatedComments = comments.filter((comment) => comment._id !== commentId);
        setComments(updatedComments);

        // Filter out the deleted comment from the replies state
        const updatedReplies = replies.filter((reply) => reply._id !== commentId);
        setReplies(updatedReplies);
      })
      .catch((error) => console.error(error));
  };


  const handleShowReplies = (commentId) => {
    // Toggle the visibility of comments based on the current state

    setShowReply(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));


    // If the comments are currently hidden, fetch and display them
    if (!showReply[commentId]) {
      fetchReplies(commentId)
        .then((response) => {
          setReplies(response.replies);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <>
      {isOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 max-w-3xl max-h-3xl mx-auto flex">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={handleCloseModal}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Image on the left */}
            <div className="lg:w-1/2 bg-cover bg-center bg-no-repeat hidden lg:block h-full" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'contain' }}></div>
            {/* Form on the right */}
            <div className="lg:w-1/2 px-6 py-8 md:px-8 lg:w-1/2 flex flex-col justify-between">
              {/* Comment listing */}
              <div className="flex items-center mb-4">
                <div className="profile-picture">
                  <img
                    src={post.userId.profilePic}
                    alt="Profile"
                    style={{
                      width: '40px',
                      height: '30px',
                      borderRadius: '50%',
                      objectFit: 'cover', // Ensure the image covers the entire container
                    }}
                  />
                </div>
                <div className="username ml-4 font-bold">
                  {post.userId.userName}
                  {user.verified && (
                    <svg
                      viewBox="0 0 22 22"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                    >
                      <path
                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                        fill="#1d9bf0"
                      ></path>
                    </svg>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto max-h-96">
                {comments.length > 0 ? comments.map((comment, index) => (
                  <>
                    <div key={index} className="comment py-5">
                      <div className="profile-info">
                        <div className="profile-picture">
                          <img
                            src={comment.userId.profilePic}
                            alt="Profile"
                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                          />
                        </div>
                        <div className="username" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                          {comment.userName}
                        </div>
                      </div>
                      <div className="comment-content">{comment.content}</div>

                      <div className="action-buttons">
                        {user.userName === comment.userName && (
                          <div>
                            <FaTrashAlt className="delete-icon" onClick={() => handleDeleteComment(comment._id)} /> {/* Delete icon */}
                          </div>
                        )}
                      </div>



                    </div>
                    <div>
                      <p className='time-ago py-0' style={{ display: 'inline-block' }}>Posted {moment(comment.createdAt).fromNow()}</p><p className='cursor-pointer' onClick={() => handleReply(comment._id, comment.userName)} style={{ display: 'inline-block', marginLeft: '30px' }}>Reply</p>
                      {comment.repliesCount > 0 && <p className='cursor-pointer' onClick={() => handleShowReplies(comment._id)}>{`show ${comment.repliesCount} replies`}</p>}
                    </div>
                    {/* Loop through replies */}
                    {showReply[comment._id] && replies.map((reply, idx) => (
                      <div key={idx} className="reply py-2" style={{ marginLeft: '100px' }}>
                        {/* Render profile picture and username here */}
                        <div className="profile-info">
                          <div className="profile-picture">
                            <img
                              src={reply.userId.profilePic}
                              alt="Profile"
                              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                            />
                          </div>
                          <div className="username" style={{ fontWeight: 'bold', marginLeft: '5px', fontSize: '14px' }}>
                            {reply.userName}
                          </div>
                          <div className="action-buttons" style={{ marginLeft: 'auto' }}> {/* Move the delete button to the right */}
                            {user.userName === reply.userName && (
                              <div>
                                <FaTrashAlt className="delete-icon" onClick={() => handleDeleteComment(reply._id)} /> {/* Delete icon */}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Render reply content here */}
                        <div>{reply.content}</div>
                        {/* Add any other reply information here */}
                      </div>
                    ))}


                  </>
                )) : <p>No comments</p>}
              </div>
              {/* Text field and button for adding new comments */}
              <form onSubmit={replyTo ? handleSubmitReply : handleAddComment}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="newComment">Add a comment</label>
                  <input
                    id="newComment"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    required
                  />
                </div>
                {replyTo && (
                  <div className="mt-2">
                    <button type="button" className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={handleCancelReply}>
                      Cancel Reply
                    </button>
                  </div>
                )}
                <div className="mt-6">
                  <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">{replyTo ? 'Post Reply' : 'Add Comment'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default CommentModal;
