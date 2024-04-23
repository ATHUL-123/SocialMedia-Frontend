import axios from "axios";

const BASE_URL =process.env.BASE_URL ||'https://hyperedge.online';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    console.log('sdfadfdsfa',BASE_URL);
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
