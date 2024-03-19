import axios from "axios";

const BASE_URL ='http://localhost:7002';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
