import axios from "axios";
import queryString from "query-string";
import { API_URL } from "../../constants/config";
import Cookies from "universal-cookie";
const axiosClient = () => {
  let cookies = new Cookies();
  cookies = cookies.get("user");
  let token = cookies ? cookies.token : "";
  return axios.create({
    baseURL: API_URL,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export default axiosClient;
