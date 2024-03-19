export const postUrl = {
    // create: "/post/create-post",
    // getPost: "/post/fetch-posts",
  
    // getPostCount: "/post/fetch-count",
  
    // getSinglePost: (postId) => `/post/fetch-single-post/${postId}`,
  
    // getUserPosts: "/post/fetchUserPosts",
  
    //delete post
    deletePost: (postId) => `/api/posts/delete-post/${postId}`,

    //update post
    update: (postId) => `/api/posts/update-post/${postId}`,
  
//     //likes
//     likePost: "/post/like-post",
//     unlikePost: "/post/unlike-post",
  
//     //comments
//     fetchComments: (postId) => `/post/fetch-comments/${postId}`,
//     fetchReplies: (commentId) => `/post/comments/replies/${commentId}`,
//     addComment: "/post/add-comment",
//     addReply: (commentId) => `/post/comments/reply-to/${commentId}`,
//     deleteComment: "/post/delete-comment",
  
//     //report
//     report: (userId, username) => `/post/report/post/${userId}/${username}`,
  

  
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

  getAllUsers :"/api/admin/getallusers",

  toggleBlockUser: (userId) => `/api/admin/toggle-userblock/${userId}`,
  
}

  
export const userUrl ={
  editProfile :"/api/users/edit-profile"
}