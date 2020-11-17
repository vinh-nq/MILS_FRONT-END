import { fetchDataAndLog } from "./config/fetchApi";

const plotLandApi = {
  add: (data) => {
    const url = "api/HouseHold/AddPlotLand";
    return fetchDataAndLog(url, "POST", null, data, "Add New Plot Land");
  },
  update: (data) => {
    const url = "api/HouseHold/UpdatePlotLand";
    return fetchDataAndLog(url, "POST", null, data, "Update Plot Land");
  },
  delete: (params) => {
    const url = "api/HouseHold/DeletePlotLand";
    return fetchDataAndLog(url, "GET", params, null, "Delete Plot Land");
  },
};

export default plotLandApi;
