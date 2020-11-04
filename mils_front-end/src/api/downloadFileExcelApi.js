import { fetchData } from "./config/fetchApi";
const downloadFileExcelApi = {
  ExportMembers: (params) => {
    const url = "api/HouseHold/ExportMemberV2";
    return fetchData(url, "GET", params, null);
  },
};
export default downloadFileExcelApi;
