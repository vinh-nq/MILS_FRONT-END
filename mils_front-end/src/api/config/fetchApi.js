import axiosClient from "./axiosClient";
import axios from "axios";
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

// {
//   ip: "42.113.205.150",
//   continent_code: "AS",
//   country: "Vietnam",
//   country_code: "VN",
//   country_code3: "VNM",
//   region: "Hanoi",
//   region_code: "HN",
//   city: "Hanoi",
//   latitude: 21.0313,
//   longitude: 105.8516,
//   timezone: "Asia/Ho_Chi_Minh",
//   offset: 25200,
//   asn: 18403,
//   organization: "The Corporation for Financing & Promoting Technology",
// };

export const fetchDataAndLog = async (url, method, params, data, detail) => {
  let cookies = new Cookies();
  cookies = cookies.get("user");
  return await axios.get("https://ip.seeip.org/geoip").then((responseInfor) => {
    if (responseInfor.statusText !== "OK") {
      throw new Error("Error when get infor address!");
    }
    return Promise.all([
      fetchDataAPI(url, method, params, data),
      fetchDataAPI("api/UserLog/InsertUserLog", "POST", params, {
        Id: null,
        username: cookies.UserName,
        action: detail,
        details: `${responseInfor.data.region}-${responseInfor.data.country}`,
        date_time: null,
        Device_ID: responseInfor.data.ip,
        Device_Name: responseInfor.data.ip,
        IP_Address: responseInfor.data.ip,
        region_code: responseInfor.data.region_code,
        country_code: responseInfor.data.country_code,
        location: `${responseInfor.data.latitude}-${responseInfor.data.longitude}`,
      }),
    ]).then(
      ([response]) => {
        if (response.data.Status) {
          return response;
        } else {
          if (response.data.Status === false) {
            throw new Error(response.data.Messages);
          }
          return response;
        }
      },
      ([error]) => {
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
  });
};

export const fetchData = (url, method, params, data) => {
  let cookies = new Cookies();
  return fetchDataAPI(url, method, params, data).then(
    (response) => {
      if (response.data.Status) {
        return response;
      } else {
        if (response.data.Status === false) {
          throw new Error(response.data.Messages);
        }
        return response;
      }
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
