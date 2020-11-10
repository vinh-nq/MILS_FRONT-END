import { fetchData } from "./config/fetchApi";
const CCTProgramApi = {
  GetPMTScored: (params) => {
    const url = "api/HouseHoldCCT/GetPMTScored";
    return fetchData(url, "GET", params, null);
  },
  GetScoreConfig: (params) => {
    const url = "api/HouseHoldCCT/GetScoreConfig";
    return fetchData(url, "GET", params, null);
  },
  GenPMTScored: (params) => {
    const url = "api/HouseHoldCCT/GenPMTScored";
    return fetchData(url, "GET", params, null);
  },
  AddNewCCTConfirm: (data) => {
    const url = "api/HouseHoldCCT/AddNewCCTConfirm";
    return fetchData(url, "POST", null, data);
  },
  GetHHCCTConfirms: (params) => {
    const url = "api/HouseHoldCCT/GetHHCCTConfirms";
    return fetchData(url, "GET", params, null);
  },
  UpdateCCTConfirm: (data) => {
    const url = "api/HouseHoldCCT/UpdateCCTConfirm";
    return fetchData(url, "POST", null, data);
  },
};
export default CCTProgramApi;
