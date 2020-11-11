import { fetchDataAndLog } from "./config/fetchApi";
const functionManagementApi = {
  GetAllFunctionet: (params) => {
    const url = "api/User/GetAllFunction";
    return fetchDataAndLog(url, "GET", params, null, "Get Information All Function");
  },
  InsertFunction: (data, detail) => {
    const url = "api/User/InsertFunction";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateFunction: (data, detail) => {
    const url = "api/User/UpdateFunction";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
};

export default functionManagementApi;
