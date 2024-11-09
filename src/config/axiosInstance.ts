import { ACCESS_TOKEN, SERVER_URL } from "@/constant";
import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: SERVER_URL + "/api/web",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
