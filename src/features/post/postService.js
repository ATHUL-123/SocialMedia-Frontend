import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = 'http://localhost:7002';
const API_URL = '/api/posts';

const postService = {
    uploadPost: async (postData, token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await axios.post(BASE_URL + API_URL + '/addpost', postData, config);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getposts: async (token, dispatch, navigate) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await axios.get(BASE_URL + API_URL + '/getpost', config);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error('Access Denied');
                
            }
            console.error(error);
            throw error.response.data;
        }
    }
}

export default postService;
