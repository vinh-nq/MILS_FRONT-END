import { fetchData } from "./config/fetchApi";
const userManagementApi = {
  GetAllUser: (params) => {
    const url = "api/User/GetAllUser";
    return fetchData(url, "GET", params, null);
  },
  InsertUser: (data) => {
    const url = "api/User/InsertUser";
    return fetchData(url, "POST", null, data);
  },
  GetUserById: (params) => {
    const url = "api/User/GetUserById";
    return fetchData(url, "GET", params, null);
  },
  UpdateUser: (data) => {
    const url = "api/User/UpdateUser";
    return fetchData(url, "POST", null, data);
  },
};

export default userManagementApi;
