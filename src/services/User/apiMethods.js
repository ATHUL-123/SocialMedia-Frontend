import { apiCall } from "./apiCalls";
import { postUrl,authUrl,userUrl, chatUrl } from "../../const/routes";





// @desc    Delete post
//@route    DELETE /post/delete/post/:postId
// @access  Registerd users
export const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = postUrl.deletePost(postId);
            apiCall("delete", url).then((response) => {
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
}


// @desc    Edit post
//@route    Edit /post/edit-post/:postId
// @access  Registerd users
export const editPost = (postId,data) => {
    return new Promise((resolve, reject) => {
        try {
            
            const url = postUrl.update(postId);
            apiCall("put", url, data).then((response) => {
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
}

//@dec      Sent Otp
//method    POST
export const sentOtp = (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", authUrl.sendOtp, data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error); 
                });
        } catch (error) {
            reject(error);
        }
    });
};

//@dec      Sent Otp
//method    POST
export const verifyOtp = (email,otp) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", authUrl.verifyOtp,{email,otp})
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error); 
                });
        } catch (error) {
            reject(error);
        }
    });
};



export const editProfile = (data)=>{
    return new Promise((resolve,reject) =>{
        try {
            apiCall("put",userUrl.editProfile,data)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error); 
                });
        } catch (error) {
            reject(error);
        }
    })
}


export const fetchUsers = (page,usersPerPage,searchQuery)=>{
    return new Promise((resolve,reject) =>{
        try { 
            apiCall("get",userUrl.fetchUsers(page,usersPerPage,searchQuery))
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error); 
                });
        } catch (error) {
            reject(error);
        }
    })
}


export const followUsers = (followeeId)=>{
    return new Promise((resolve,reject) =>{
        try { 
            apiCall("post",userUrl.followUser(followeeId))
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error); 
                });
        } catch (error) {
            reject(error);
        }
    })
}


export const unFollowUsers =(unfolloweeId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('put',userUrl.unFollowUser(unfolloweeId))
                .then((response)=>{
                    resolve(response)
                })
                 .catch((error)=>{
                    reject(error);
                 })
            
        } catch (error) {
            reject(error)
        }
    })
}

// apiMethods.js
export const fetchFollowing = (page, usersPerPage) => {
    return new Promise((resolve, reject) => {
      try {
        apiCall('get', userUrl.fetchFollowees(page, usersPerPage))
          .then((response) => {
            resolve(response); // Assuming response contains data property with 'following' and 'totalCount' fields
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };


  export const fetchFollowers = (page, usersPerPage) => {
    return new Promise((resolve, reject) => {
      try {
        apiCall('get', userUrl.fetchFollowers(page, usersPerPage))
          .then((response) => {
            resolve(response); // Assuming response contains data property with 'following' and 'totalCount' fields
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  

  export const getSingleUser =(userId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('get', userUrl.getSingleUser(userId))
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        } catch (error) {
            reject(error);
        }
    })
  }

  export const getPostByUserId = (userId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('get',postUrl.getUserPost(userId))
            .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const togglePrivacy = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('patch',userUrl.togglePrivacy)
            .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const getRequests =()=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('get',userUrl.getRequest)
              .then((response)=>{
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const acceptRequest =(userId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('put',userUrl.acceptRequest(userId))
            .then((response)=>{
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const rejectRequest =(userId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('put',userUrl.rejectRequest(userId))
            .then((response)=>{
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const getAllFollowesPost = (page,pageSize)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('get',postUrl.getAllFollowersPost(page,pageSize))
            .then((response)=>{
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const LikePost =(postId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('patch',postUrl.likePost(postId))
            .then((response)=>{
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
            reject(error)
        }
    })
  }

  export const unLikePost =(postId)=>{
    return new Promise((resolve,reject)=>{
      try {
        
        apiCall('patch',postUrl.unLikePost(postId))
            .then((response)=>{
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
      } catch (error) {
        reject(error)
      }
    })
  }

  export const reportPost =(postId,data)=>{
    return new Promise((resolve,reject)=>{
      try {
        apiCall('post',postUrl.reportPost(postId),data)
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }

  export const addComment =(postId,data)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('post',postUrl.addComment(postId),data)
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }

  export const replyComment =(commentId,data)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('put',postUrl.addReply(commentId),data)
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  
  export const fetchReplies =(commentId)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('get',postUrl.fetchReplies(commentId))
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }
  

  export const getAllComments =(postId)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('get',postUrl.fetchComments(postId))
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }


  export const deleteComment = (CommentId)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('delete',postUrl.deleteComment(CommentId))
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }

  export const startPayment = ()=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('post',userUrl.payment)
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }

  export const paymentSuccess = (data)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('post',userUrl.paymentSuccess,data)
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }


  export const searchPost = (searchQuery)=>{
    return new Promise ((resolve,reject)=>{
      try {
        apiCall('get',postUrl.searchPost(searchQuery))
        .then((response)=>{
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }

export const explorePosts = (page,pageSize)=>{
  return new Promise ((resolve,reject)=>{
    try {
      apiCall('get',postUrl.explorePosts(page,pageSize))
      .then((response)=>{
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error)
    }
  })
}


export const getAllConversations =()=>{
  return new Promise ((resolve,reject)=>{
    try {
      apiCall('get',chatUrl.getAllConversation)
      .then((response)=>{
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error)
    }
  })
}

export const getAllMessages =(conversationId)=>{
  return new Promise ((resolve,reject)=>{
    try {
      apiCall('get',chatUrl.getAllMessages(conversationId))
      .then((response)=>{
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error)
    }
  })
}

export const sendNewMessage =(data)=>{
  return new Promise ((resolve,reject)=>{
    try {
      apiCall('post',chatUrl.addMessage,data)
      .then((response)=>{
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error)
    }
  })
}

export const addNewConversation =(data)=>{
  return new Promise ((resolve,reject)=>{
    try {
      apiCall('post',chatUrl.addConversation,data)
      .then((response)=>{
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error)
    }
  })
}


export const removeVerification=()=>{
  return new Promise ((resolve,reject)=>{
    try {
      apiCall('patch',userUrl.removeVerification)
      .then((response)=>{
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error)
    }
  })
}