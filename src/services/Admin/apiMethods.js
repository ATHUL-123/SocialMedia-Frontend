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


export const getAllUsers = (page,usersPerPage)=>{

    return new Promise((resolve,reject)=>{
        try {
            apiCall("get", adminUrl.getAllUsers(page,usersPerPage))
                .then((response) => {
                  
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
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

export const getAllReports = (page,limit)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall('get',adminUrl.getAllReports(page,limit))
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

export const takeAction =(targetId)=>{
    console.log('dd');
    console.log(targetId);
     return new Promise((resolve,reject)=>{
        try {
            apiCall('put',adminUrl.takeAction(targetId))
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error); 
            });
        } catch (error) {
            reject(error)
        }
     })
}

export const fetchAllKyc =()=>{

   
     return new Promise((resolve,reject)=>{
        try {
            apiCall('get',adminUrl.fetchAllKyc)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error); 
            });
        } catch (error) {
            reject(error)
        }
     })
}

export const rejectKyc=(message,kycId)=>{

   
    return new Promise((resolve,reject)=>{
       try {
           apiCall('delete',adminUrl.rejectKyc(kycId,message))
           .then((response) => {
               resolve(response);
           })
           .catch((error) => {
               console.log(error);
               reject(error); 
           });
       } catch (error) {
           reject(error)
       }
    })
}

export const acceptKyc=(kycId)=>{

   
    return new Promise((resolve,reject)=>{
       try {
           apiCall('patch',adminUrl.acceptKyc(kycId))
           .then((response) => {
               resolve(response);
           })
           .catch((error) => {
               console.log(error);
               reject(error); 
           });
       } catch (error) {
           reject(error)
       }
    })
}