import { fetchData, fetchDataAndLog } from "./config/fetchApi";
const CCTProgramApi = {
  GetPMTScored: (params) => {
    const url = "api/HouseHoldCCT/GetPMTScored";
    return fetchDataAndLog(url, "GET", params, null, "Get PMT Scored");
  },
  GetScoreConfig: (params) => {
    const url = "api/HouseHoldCCT/GetScoreConfig";
    return fetchData(url, "GET", params, null);
  },
  GenPMTScored: (params) => {
    const url = "api/HouseHoldCCT/GenPMTScored";
    return fetchDataAndLog(url, "GET", params, null, "Gender List PMT Scored");
  },
  AddNewCCTConfirm: (data) => {
    const url = "api/HouseHoldCCT/AddNewCCTConfirm";
    return fetchDataAndLog(
      url,
      "POST",
      null,
      data,
      "Add New List HouseHold To CCT Progarm"
    );
  },
  GetHHCCTConfirms: (params) => {
    const url = "api/HouseHoldCCT/GetHHCCTConfirms";
    return fetchData(url, "GET", params, null);
  },
  UpdateCCTConfirm: (data, detail) => {
    const url = "api/HouseHoldCCT/UpdateCCTConfirm";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
};
export default CCTProgramApi;
