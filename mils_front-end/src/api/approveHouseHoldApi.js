import { fetchDataAndLog, fetchData } from "./config/fetchApi";
const approveHouseHoldApi = {
  GetHHToSendRequest: (params) => {
    const url = "api/Approve/GetHHToSendRequest";
    return fetchData(url, "GET", params, null);
  },
  GetHHForCM: (params) => {
    const url = "api/Approve/GetHHForCM";
    return fetchData(url, "GET", params, null);
  },
  GetHHForDistrict: (params) => {
    const url = "api/Approve/GetHHForDistrict";
    return fetchData(url, "GET", params, null);
  },
  GetHHForCentral: (params) => {
    const url = "api/Approve/GetHHForCentral";
    return fetchData(url, "GET", params, null);
  },
  SendRequetHHApprove: (data, detail) => {
    const url = "api/Approve/SendRequetHHApprove";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  DistrictApprove: (data, detail) => {
    const url = "api/Approve/DistrictApprove";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  DistrictReject: (data, detail) => {
    const url = "api/Approve/DistrictReject";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  CentralApprove: (data, detail) => {
    const url = "api/Approve/CentralApprove";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  CentralReject: (data, detail) => {
    const url = "api/Approve/CentralReject";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
};
export default approveHouseHoldApi;
