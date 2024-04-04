
import { followUsers } from "../services/User/apiMethods";

export const postUrl = {
    // create: "/post/create-post",
    // getPost: "/post/fetch-posts",
  
    explorePosts: (page,pageSize)=>`/api/posts/explore-posts?page=${page}&pageSize=${pageSize}`,
  
    // getSinglePost: (postId) => `/post/fetch-single-post/${postId}`,
  
    searchPost:(searchQuery)=> `/api/posts/search-post?searchQuery=${searchQuery}`,
  
    //delete post
    deletePost: (postId) => `/api/posts/delete-post/${postId}`,

    //update post
    update: (postId) => `/api/posts/update-post/${postId}`,
  
//     //likes
        likePost:(postId)=> `/api/posts/like-post/${postId}`,
       unLikePost:(postId)=> `/api/posts/unlike-post/${postId}`,
  
//     //comments
    fetchComments: (postId) => `/api/posts/fetch-comments/${postId}`,
    fetchReplies: (commentId) => `/api/posts/fetch-replies/${commentId}`,
       addComment:(postId)=>`/api/posts/add-comment/${postId}`,
    addReply: (commentId) => `/api/posts/comments/reply-to/${commentId}`,
    deleteComment:(commentId)=> `/api/posts/delete-comment/${commentId}`,
  
//     //report
    reportPost: (postId) => `/api/posts/report-post/${postId}`,
  
        getAllFollowersPost :(page,pageSize)=>`/api/posts/allfollowingsPost?page=${page}&pageSize=${pageSize}`,
        getUserPost :(userId) => `/api/posts/getuserpost/${userId}`
//     //toget evry posts 20 per req.
//     getAll: `/post/get-every-posts`,
  };



  export const authUrl = {
    // authUser: "/auth/user",
    // authAdmin: "/auth/admin",
    
    sendOtp: "/api/users/send-otp",
    verifyOtp: "/api/users/verify-otp",
    
};

export const adminUrl ={
  adminLogin :"/api/admin/login",

  getAllUsers :(page,usersPerPage)=>`/api/admin/getallusers?page=${page}&limit=${usersPerPage}`,

  toggleBlockUser: (userId) => `/api/admin/toggle-userblock/${userId}`,

  getAllReports:(page,usersPerPage)=>`/api/admin/get-reports?page=${page}&limit=${usersPerPage}`,

  takeAction:(targetId)=>`/api/admin/take-action?targetId=${targetId}`
  
}

  
export const userUrl ={

  editProfile :"/api/users/edit-profile",
  fetchUsers  : (page,usersPerPage,searchQuery)=> `/api/users/fetch-users?page=${page}&limit=${usersPerPage}&searchQuery=${searchQuery}`,
  followUser  :(followeeId)=> `/api/users/follow/${followeeId}`,
  unFollowUser:(unFolloweeId)=> `/api/users/unfollow/${unFolloweeId}`,
  fetchFollowees :(page,usersPerPage)=>`/api/users/fetch-following?page=${page}&limit=${usersPerPage}`,
  fetchFollowers :(page,usersPerPage)=>`/api/users/fetch-followers?page=${page}&limit=${usersPerPage}`,
  getSingleUser:(userId)=>`/api/users/get-single-user/${userId}`,
  togglePrivacy :`/api/users/toggleprivacy`,
  getRequest:`/api/users/get-request`,
  acceptRequest:(userId)=>`/api/users/accept-request/${userId}`,  
  rejectRequest:(userId)=>`/api/users/reject-request/${userId}`,
  payment :`/api/users/payment/create`,
  paymentSuccess:`/api/users/payment/success`,
  removeVerification:`/api/users/remove-verify`
  
}

export const chatUrl ={
  getAllConversation :"/api/chats/conversation",
  getAllMessages     :(converSationId)=>`/api/chats/message/${converSationId}`,
  addMessage         :'/api/chats/message',
  addConversation    :'/api/chats/conversation'
}