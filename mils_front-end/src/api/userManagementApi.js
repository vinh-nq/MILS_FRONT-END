import { fetchData, fetchDataAndLog } from "./config/fetchApi";
const userManagementApi = {
  GetAllUser: (params) => {
    const url = "api/User/GetAllUser";
    return fetchData(url, "GET", params, null);
  },
  InsertUser: (data, detail) => {
    const url = "api/User/InsertUser";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetUserById: (params, detail) => {
    const url = "api/User/GetUserById";
    return fetchDataAndLog(url, "GET", params, null, detail);
  },
  UpdateUser: (data, detail) => {
    const url = "api/User/UpdateUser";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
};

export default userManagementApi;
