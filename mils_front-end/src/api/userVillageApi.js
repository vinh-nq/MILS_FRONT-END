import { fetchDataAndLog } from "./config/fetchApi";
const userVillageApi = {
  GetAll: (params) => {
    const url = "api/UserVillage/GetAll";
    return fetchDataAndLog(url, "GET", params, null, "Get List User Village");
  },
  Insert: (data, detail) => {
    const url = "api/UserVillage/Insert";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  Delete: (data, detail) => {
    const url = "api/UserVillage/Delete";
    return fetchDataAndLog(url, "GET", data, null, detail);
  },
};
export default userVillageApi;
