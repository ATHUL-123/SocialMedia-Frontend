import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/User/Header/Header';
import UsersList from '../../../components/User/UsersList/UsersList';
import UserProfile from './UserProfile';
import { getSingleUser, getPostByUserId } from '../../../services/User/apiMethods';
import Spinner from '../../../components/User/Spinner/Spinner';
import MyPost from './ProfilePost';

function OtherProfile() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSingleUser(userId)
      .then((response) => {
        setUser(response);
        setFollowing(response.following);
        setLoading(false);
        if (response.access) {
          setPostLoading(true);
          getPostByUserId(userId)
            .then((response) => {
              setPosts(response);
              setPostLoading(false);
            })
            .catch((error) => {
              setError(true);
              console.log(error);
            });
        } else {
          setStatus(true);
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [userId]);

  if (loading || error) {
    return <Spinner />;
  }

  return (
    <>
    <Header />
    <div className="flex">
      {/* Scrollable UsersList */}
      <div className="w-full md:w-1/4 h-90vh bg-indigo-100 overflow-y-auto scrollbar-hidden rounded-lg shadow-lg">
  <UsersList />
</div>

  
      {/* UserProfile and Post section */}
      <div className="flex flex-col flex-grow">
        <div className="overflow-y-auto h-screen md:h-auto">
          <UserProfile user={user} following={following} />
        </div>
        <section className="bg-white dark:bg-gray-900 flex-1 overflow-y-auto">
          <div className="container px-6 mx-auto">
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {/* Ensuring each post occupies a grid cell */}
              {status ? (
                <p>Private Account</p>
              ) : postLoading ? (
                <p>Loading...</p>
              ) : posts.length > 0 ? (
                posts.map((post, index) => (
                  <div key={index} className="p-5 antialiased">
                    <MyPost user={user} post={post} />
                  </div>
                ))
              ) : (
                'No Post'
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
  
  
  );
}

export default OtherProfile;
