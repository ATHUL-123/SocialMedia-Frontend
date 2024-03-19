import React,{useState} from 'react';
import { format } from 'date-fns';
import { AiFillHeart, AiOutlineComment, AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import EditPost from '../Modals/EditPost';


import DeleteConfirm from '../Modals/DeleteConfirm';


function MyPost({ post }) {
  const [isEditPost, setIsEditPost] = useState(false);
  
  const toggleEditModal =()=>{
    setIsEditPost(!isEditPost)
  }

  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm,setOpenConfirm] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setOpenConfirm(!openConfirm);
  };


  return (
    <>
    <div>
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
              <AiFillHeart className="h-6 w-6 text-gray-400 cursor-pointer" />
              <span className="text-gray-400">10</span>
              <AiOutlineComment className="h-6 w-6 text-gray-400 cursor-pointer" />
              <span className="text-gray-400">20</span>
            </div>
            <div className="relative">
            <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
      >
        <svg
          className="w-5 h-5 text-gray-800 dark:text-white"
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
          className="fixed inset-0 z-10 w-full h-full"
        ></div>
      )}
     <div
  className={`absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 ${
    isOpen ? 'block' : 'hidden'
  }`}
  onMouseEnter={() => setIsOpen(true)} // Show the dropdown when mouse enters
  onMouseLeave={() => setIsOpen(false)} // Hide the dropdown when mouse leaves
>
  <button
  onClick={toggleEditModal}
    className="block w-full px-4 py-3 text-sm text-gray-600 capitalize transition-colors text-left duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    Edit
  </button>
  <button
    onClick={toggleModal}
    className="block w-full px-4 py-3 text-sm text-red-600 capitalize transition-colors text-left duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
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
    {openConfirm && <DeleteConfirm isOpen={openConfirm} onClose={toggleModal} postId={post._id} />}

    {isEditPost && <EditPost isOpen={isEditPost} onClose={toggleEditModal} post={post}/>}
</>
  
  );
}

export default MyPost;
