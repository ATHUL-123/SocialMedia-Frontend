import { api } from "./api";



export const apiCall = async (method, url, data) => {
    return await new Promise(async (resolve, reject) => {
      try {
       
        let response, error;
  
        if (method === "post") {
          response = await api.post(url, data).catch((err) => {
            console.log(err);
            error = err;
          });
        } else if (method === "get") {
          response = await api.get(url, data).catch((err) => {
            error = err;
          });
        } else if (method === "patch") {
          response = await api.patch(url, data).catch((err) => {
            error = err;
          });
        } else if (method === "delete") {
          response = await api.delete(url, data).catch((err) => {
            error = err;
          });
        } else if (method === "put"){
          response = await api.put(url, data).catch((err) => {
            error = err;
          })
        }
        
        if(response){
          resolve(response.data);
        } else if (error) {
          if (error.code === 'ERR_NETWORK') {
            // Redirect to error page
            window.location.href = '/error';
          } else {
            // Handle other errors
            reject(error);
          }
        
        }
          
        
      } catch (err) {
        if (err.code === 'ERR_NETWORK') {
          // Redirect to error page
          window.location.href = '/error';
        } else {
          // Handle other errors
          reject(err);
        }
      }
    });
  };
  
  