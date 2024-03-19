import { apiCall } from "./apiCalls";
import { adminUrl } from "../../const/routes";




//@dec      Sent Otp
//method    POST
export const adminLogin= (data) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", adminUrl.adminLogin,data)
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


export const getAllUsers = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("get", adminUrl.getAllUsers)
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


export const toggleUserBlock =(userId)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('patch',adminUrl.toggleBlockUser(userId))
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