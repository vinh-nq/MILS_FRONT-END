import axiosClient from "./axiosClient";
import { openNotification } from "../../components/common/Notification";
import Cookies from "universal-cookie";

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
let cookies = new Cookies();
export const fetchData = (url, method, params, data) => {
  return fetchDataAPI(url, method, params, data).then(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 401:
          window.location.href = window.location.origin + "/login";
          return;
        case 403:
          cookies.remove("user");
          window.location.href =
            window.location.origin + "/error-authentication";
          return;
        default:
          openNotification(
            "error",
            "Thông báo",
            `Lỗi xảy ra trong quá trình lấy dữ liệu !`
          );
          break;
      }
    }
  );
};
