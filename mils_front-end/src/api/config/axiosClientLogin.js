import axios from "axios";
import queryString from "query-string";
import { API_URL } from "../../constants/config";

const axiosClientLogin = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClientLogin.interceptors.request.use(async (config) => {
  return config;
});

axiosClientLogin.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClientLogin;
