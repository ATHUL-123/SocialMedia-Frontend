import axios from "axios";

const BASE_URL ='http://localhost:7002';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin && admin.token) {
      config.headers["Authorization"] = `Bearer ${admin.token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
