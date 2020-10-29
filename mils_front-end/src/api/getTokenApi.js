import axiosClientLogin from "./config/axiosClientLogin";
import querystring from "query-string";
const getTokenApi = {
  getToken: (data) => {
    const url = "token";
    return axiosClientLogin.post(url, querystring.stringify(data));
  },
};

export default getTokenApi;
