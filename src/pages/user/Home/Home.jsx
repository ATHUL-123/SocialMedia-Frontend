import React, { useEffect, useState } from 'react';
import Header from '../../../components/User/Header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../../features/post/postSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import PostItem from '../../../components/User/PostList/PostList';
import PostShimmer from '../../../components/User/Skeltons/PostSkelton';
import SideProfile from '../../../components/User/SideProfile/SideProfile';
import './Home.css';
import UsersList from '../../../components/User/UsersList/UsersList';
import { getAllFollowesPost } from '../../../services/User/apiMethods';
import { useSocket } from '../../../utils/SocketContext';
const Home = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5; // Number of posts per page

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const socket = useSocket()
  useEffect(() => {
    if (socket.current) {

      socket.current.emit('addUser', user._id)
    }

  }, [socket])

  useEffect(() => {
    setLoading(true);
    getAllPosts();
  }, [user, page]); // Fetch posts when user changes or page changes

  const getAllPosts = () => {
    getAllFollowesPost(page, pageSize)
      .then((response) => {
        // Filter out duplicate posts

        setPosts([...posts, ...response]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  return (
    <>
      <div>
        <Header toggleSearch={() => setShowUserList(!showUserList)} />
        <div className=" px-10 w-full bg-white h-screen flex flex-col md:flex-row justify-center overflow-hidden">
          <UsersList />
          <div className="flex-1 p-5 antialiased overflow-y-auto custom-scrollbar">
            <div className="mt-3 flex flex-col items-center">
              {posts.length > 0 ? (
                posts.map((post) => <PostItem key={post._id} post={post} />)
              ) : (
                <p>No posts available</p>
              )}
            </div>

            {loading && (
              <div className="mt-5 flex flex-col items-center">
                {[...Array(5)].map((_, index) => (
                  <PostShimmer key={index} />
                ))}
              </div>
            )}

            {!loading && posts.length > 0 ? (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            ):(<div className="flex justify-center mt-4">
            <p className="text-gray-500">Follow some friends to see their posts on your feed.</p>
          </div>)}
          </div>
          {user && <SideProfile user={user} />}
        </div>
      </div>
    </>
  );
};

export default Home;
