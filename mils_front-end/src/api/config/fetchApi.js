import axiosClient from "./axiosClient";
// import { openNotification } from "../../components/common/Notification";
import Cookies from "universal-cookie";
import { message } from "antd";

export const fetchDataAPI = (url, method, params, data) => {
  switch (method) {
    case "GET":
      return axiosClient().get(url, { params });
    case "POST":
      return axiosClient().post(url, data);
    case "PUT":
      return axiosClient().put(url, data);
    case "DELETE":
      return axiosClient().delete(url, { params });
    default:
      break;
  }
};

export const fetchData = (url, method, params, data) => {
  let cookies = new Cookies();
  return fetchDataAPI(url, method, params, data).then(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.data.StatusCode) {
        case 401:
          window.location.href = window.location.origin + "/login";
          break;
        case 403:
          cookies.remove("user");
          window.location.href =
            window.location.origin + "/error-authentication";
          throw new Error(error.response.data.Message);
        default:
          message.error("Error");
          break;
      }
    }
  );
};
