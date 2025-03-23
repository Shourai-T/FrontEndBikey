import axios from "axios";

import store from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/slice/authSlice";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post(`/v1/auth/refresh-token`);
    return response.data;
  } catch (error) {
    console.error('Refresh token failed', error);
    return null;
  }
};

// Thêm response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('Error response', error.response.status);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await refreshAccessToken();
      // Gọi dispatch để cập nhật state với token mới
      const dispatch = store.dispatch; // Lấy dispatch từ store
      if (res) {
        dispatch(loginSuccess(res)); // Cập nhật state
        return axiosInstance(originalRequest);
      }
      else {
        console.log('Token expired');
        dispatch(logoutSuccess());

        window.location.href = '/login'; // hoặc sử dụng useHistory để điều hướng
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;