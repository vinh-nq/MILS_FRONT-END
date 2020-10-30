import { fetchData } from "./config/fetchApi";
const functionManagementApi = {
  GetAllFunctionet: (params) => {
    const url = "api/User/GetAllFunction";
    return fetchData(url, "GET", params, null);
  },
};

export default functionManagementApi;
