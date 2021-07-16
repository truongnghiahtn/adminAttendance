import axios from "axios";
import { get } from "./localStorage";

const instance = axios.create({
  baseURL: "https://www.appattendance.somee.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => err
);

export default instance;
