import { apiCall } from "./apiCalls";
import { postUrl,authUrl,userUrl } from "../../const/routes";





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


