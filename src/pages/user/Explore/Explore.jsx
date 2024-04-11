import React, { useEffect, useState } from 'react';
import Header from '../../../components/User/Header/Header';
import { useSelector } from 'react-redux';
import PostItem from '../../../components/User/PostList/PostList';
import PostShimmer from '../../../components/User/Skeltons/PostSkelton';
import SideProfile from '../../../components/User/SideProfile/SideProfile';
import UsersList from '../../../components/User/UsersList/UsersList';
import { explorePosts,searchPost } from '../../../services/User/apiMethods';


const Explore = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5; // Number of posts per page
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    getAllPosts();
  }, [user, page]); // Fetch posts when user changes, page changes or search query changes

  const getAllPosts = () => {
    explorePosts(page, pageSize, searchQuery)
      .then((response) => {
        console.log('ress,',response);
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

  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
   
    searchPost(query).then((response)=>{
        console.log('res....',response);
       setPosts(response.data)
    })
  };

  return (
    <>
      <div>
        <Header toggleSearch={() => setShowUserList(!showUserList)} onSearch={handleSearch} />
        <div className="w-full bg-indigo-100 h-screen flex flex-col md:flex-row justify-center overflow-hidden">
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
              
            {!loading && posts.length > 0 && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
          {user && <SideProfile user={user} />}
        </div>
      </div>
    </>
  );
};

export default Explore;
