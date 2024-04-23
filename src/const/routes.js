
import { fetchTaggedPost, followUsers } from "../services/User/apiMethods";

export const postUrl = {
  // Endpoint to explore posts with pagination
  explorePosts: (page, pageSize) => `/api/posts/explore-posts?page=${page}&pageSize=${pageSize}`,

  // Endpoint to search posts by query
  searchPost: (searchQuery) => `/api/posts/search-post?searchQuery=${searchQuery}`,

  // Endpoint to delete a post
  deletePost: (postId) => `/api/posts/delete-post/${postId}`,

  // Endpoint to update a post
  update: (postId) => `/api/posts/update-post/${postId}`,

  // Endpoint to like a post
  likePost: (postId) => `/api/posts/like-post/${postId}`,

  // Endpoint to unlike a post
  unLikePost: (postId) => `/api/posts/unlike-post/${postId}`,

  // Endpoint to fetch comments of a post
  fetchComments: (postId) => `/api/posts/fetch-comments/${postId}`,

  // Endpoint to fetch replies to a comment
  fetchReplies: (commentId) => `/api/posts/fetch-replies/${commentId}`,

  // Endpoint to add a comment to a post
  addComment: (postId) => `/api/posts/add-comment/${postId}`,

  // Endpoint to add a reply to a comment
  addReply: (commentId) => `/api/posts/comments/reply-to/${commentId}`,

  // Endpoint to delete a comment
  deleteComment: (commentId) => `/api/posts/delete-comment/${commentId}`,

  // Endpoint to report a post
  reportPost: (postId) => `/api/posts/report-post/${postId}`,

  // Endpoint to fetch posts of all followers
  getAllFollowersPost: (page, pageSize) => `/api/posts/allfollowingsPost?page=${page}&pageSize=${pageSize}`,

  // Endpoint to fetch posts of a specific user
  getUserPost: (userId) => `/api/posts/getuserpost/${userId}`,

  // Endpoint to fetch the count of comments for a post
  getCommentCount: (postId) => `/api/posts/commentCount/${postId}`,

  // Endpoint to save a post
  savePost: (postId) => `/api/posts/savePost/${postId}`,

  // Endpoint to fetch saved posts
  fetchSaved: `/api/posts/savePost`,

  // Endpoint to remove a saved post
  removeSaved: (savedId) => `/api/posts/savePost/${savedId}`,

  // Endpoint to fetch posts tagged with a user
  fetchTaggedPost: (userId) => `/api/posts/fetch-tagged/${userId}`,

  // Endpoint to fetch posts liked by a user
  fetchLiked: (postId) => `/api/posts/fetch-liked/${postId}`
};




export const authUrl = {
  // authUser: "/auth/user",
  // authAdmin: "/auth/admin",

  sendOtp: "/api/users/send-otp",
  verifyOtp: "/api/users/verify-otp",

};

export const adminUrl = {
  // Endpoint for admin login
  adminLogin: "/api/admin/login",

  // Endpoint to get all users with pagination
  getAllUsers: (page, usersPerPage) => `/api/admin/getallusers?page=${page}&limit=${usersPerPage}`,

  // Endpoint to toggle block status of a user
  toggleBlockUser: (userId) => `/api/admin/toggle-userblock/${userId}`,

  // Endpoint to get all reports with pagination
  getAllReports: (page, usersPerPage) => `/api/admin/get-reports?page=${page}&limit=${usersPerPage}`,

  // Endpoint to take action on a reported item
  takeAction: (targetId) => `/api/admin/take-action?targetId=${targetId}`,

  // Endpoint to fetch all KYC submissions
  fetchAllKyc: `/api/admin/fetch-kyc`,

  // Endpoint to reject a KYC submission
  rejectKyc: (kycId, message) => `/api/admin/reject-kyc/${kycId}/${message}`,

  // Endpoint to accept a KYC submission
  acceptKyc: (kycId) => `/api/admin/accept-kyc/${kycId}`,

  // Endpoint to fetch counts for admin dashboard
  fetchCounts: `/api/admin/getcounts`,

  // Endpoint to fetch average values for admin dashboard
  fetchAvg: `/api/admin/getaverage`,

  // Endpoint to fetch chart data for admin dashboard
  fetchChartData: (year) => `/api/admin/chartData?year=${year}`
}



export const userUrl = {
  // Endpoint to edit user profile
  editProfile: "/api/users/edit-profile",

  // Endpoint to fetch users with pagination and search query
  fetchUsers: (page, usersPerPage, searchQuery) => `/api/users/fetch-users?page=${page}&limit=${usersPerPage}&searchQuery=${searchQuery}`,

  // Endpoint to follow a user
  followUser: (followeeId) => `/api/users/follow/${followeeId}`,

  // Endpoint to unfollow a user
  unFollowUser: (unFolloweeId) => `/api/users/unfollow/${unFolloweeId}`,

  // Endpoint to fetch followees of a user with pagination
  fetchFollowees: (page, usersPerPage) => `/api/users/fetch-following?page=${page}&limit=${usersPerPage}`,

  // Endpoint to fetch followers of a user with pagination
  fetchFollowers: (page, usersPerPage) => `/api/users/fetch-followers?page=${page}&limit=${usersPerPage}`,

  // Endpoint to get information of a single user
  getSingleUser: (userId) => `/api/users/get-single-user/${userId}`,

  // Endpoint to toggle privacy settings
  togglePrivacy: `/api/users/toggleprivacy`,

  // Endpoint to get user's connection requests
  getRequest: `/api/users/get-request`,

  // Endpoint to accept a connection request
  acceptRequest: (userId) => `/api/users/accept-request/${userId}`,

  // Endpoint to reject a connection request
  rejectRequest: (userId) => `/api/users/reject-request/${userId}`,

  // Endpoint for payment initiation
  payment: `/api/users/payment/create`,

  // Endpoint for successful payment confirmation
  paymentSuccess: `/api/users/payment/success`,

  // Endpoint to remove verification
  removeVerification: `/api/users/remove-verify`,

  // Endpoint to get all notifications for a user
  getAllNotifications: `/api/users/notifications`,

  // Endpoint to check if a user is following another user
  isFollowing: (userId) => `/api/users/isFollowing/${userId}`,

  // Endpoint to search all users
  searchAll: (searchQuery) => `/api/users/searchallusers?searchQuery=${searchQuery}`,

  // Endpoint to get connection count for a user
  getConnectionCount: (userId) => `/api/users/get-count/${userId}`,

  // Endpoint to get notification count for a user
  getNoticationCount: `/api/users/notification-count`,

  // Endpoint to submit KYC information for authentication
  submitKyc: `/api/users/kyc`,

  // Endpoint to check if KYC information is submitted
  isKycSubmitted: `/api/users/isKyc`
}


export const chatUrl = {
  // Endpoint to get all conversations
  getAllConversation: "/api/chats/conversation",

  // Endpoint to get all messages for a specific conversation
  getAllMessages: (converSationId) => `/api/chats/message/${converSationId}`,

  // Endpoint to add a new message to a conversation
  addMessage: '/api/chats/message',

  // Endpoint to add a new conversation
  addConversation: '/api/chats/conversation',

  // Endpoint to mark a message as read by a specific reader in a conversation
  messageReaded: (convId, readerId) => `/api/chats/message/read/${convId}/${readerId}`,

  // Endpoint to delete a message
  deleteMessage: (messageId, type) => `/api/chats/message/delete/${messageId}/${type}`
}
