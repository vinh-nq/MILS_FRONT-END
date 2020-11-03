import { fetchData } from "./config/fetchApi";
const downloadFileExcelApi = {
  ExportMembers: (params) => {
    const url = "api/HouseHold/ExportMembers";
    return fetchData(url, "GET", params, null);
  },
};
export default downloadFileExcelApi;
