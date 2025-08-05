import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials:true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
