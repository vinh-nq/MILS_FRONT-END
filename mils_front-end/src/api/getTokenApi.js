import axiosClientLogin from "./config/axiosClientLogin";
import querystring from "query-string";
import { fetchDataAPI } from "./config/fetchApi";
import axios from "axios";

const getTokenApi = {
  getToken: (data) => {
    const url = "token";
    return axiosClientLogin.post(url, querystring.stringify(data));
  },
  insertLog: async (UserName) => {
    return await axios
      .get("https://ip.seeip.org/geoip")
      .then(async (responseInfor) => {
        if (responseInfor.statusText !== "OK") {
          throw new Error("Error when get infor address!");
        }
        await fetchDataAPI("api/UserLog/InsertUserLog", "POST", null, {
          Id: null,
          username: UserName,
          action: `Login Into MisLaos Web`,
          details: `${responseInfor.data.region}-${responseInfor.data.country}`,
          date_time: null,
          Device_ID: responseInfor.data.ip,
          Device_Name: responseInfor.data.ip,
          IP_Address: responseInfor.data.ip,
          region_code: responseInfor.data.region_code,
          country_code: responseInfor.data.country_code,
          location: `${responseInfor.data.latitude}-${responseInfor.data.longitude}`,
        }).then((res) => {
          return null;
        });
      });
  },
};

export default getTokenApi;
