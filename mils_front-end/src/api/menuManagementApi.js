import { fetchData } from "./config/fetchApi";
const menuManagementApi = {
  GetMenu: (params) => {
    const url = "api/Menu/GetMenu";
    return fetchData(url, "GET", params, null);
  },
  GetMenuListByHeader: (params) => {
    const url = "api/Menu/GetMenuListByHeader";
    return fetchData(url, "GET", params, null);
  },
};
export default menuManagementApi;
