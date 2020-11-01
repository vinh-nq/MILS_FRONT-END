import { fetchData } from "./config/fetchApi";
const functionManagementApi = {
  GetAllFunctionet: (params) => {
    const url = "api/User/GetAllFunction";
    return fetchData(url, "GET", params, null);
  },
  InsertFunction: (data) => {
    const url = "api/User/InsertFunction";
    return fetchData(url, "POST", null, data);
  },
  UpdateFunction: (data) => {
    const url = "api/User/UpdateFunction";
    return fetchData(url, "POST", null, data);
  },
};

export default functionManagementApi;
