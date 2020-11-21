import { fetchDataAndLog, fetchData } from "./config/fetchApi";
const householdLogApi = {
  GetHHLog: (params) => {
    const url = "api/UserLog/GetHHLog";
    return fetchData(url, "GET", params, null);
  },
  InsertHHLog: (data, detail) => {
    const url = "api/UserLog/InsertHHLog";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetVillageByUser: (params) => {
    const url = "api/UserVillage/GetVillageByUser";
    return fetchData(url, "GET", params, null);
  },
};
export default householdLogApi;
