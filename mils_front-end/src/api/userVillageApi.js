import { fetchData } from "./config/fetchApi";
const userVillageApi = {
  GetAll: (params) => {
    const url = "api/UserVillage/GetAll";
    return fetchData(url, "GET", params, null);
  },
  Insert: (data) => {
    const url = "api/UserVillage/Insert";
    return fetchData(url, "POST", null, data);
  },
  Delete: (data) => {
    const url = "api/UserVillage/Delete";
    return fetchData(url, "GET", data, null);
  },
};
export default userVillageApi;
