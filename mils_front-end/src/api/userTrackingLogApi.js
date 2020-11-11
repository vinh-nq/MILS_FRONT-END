import { fetchData } from "./config/fetchApi";

const userTrackingLogApi = {
  GetAllUserLog: (params) => {
    const url = "api/UserLog/GetAllUserLog";
    return fetchData(url, "GET", params, null);
  },
};

export default userTrackingLogApi;
