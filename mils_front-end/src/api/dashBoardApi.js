import { fetchDataAndLog, fetchData } from "./config/fetchApi";

const dashBoardApi = {
  CountHH: (data) => {
    const url = "api/Dashboard/CountHH";
    return fetchData(url, "GET", data, null);
  },
  GetChartDataHHMonthy: (params, detail) => {
    const url = "api/Dashboard/GetChartDataHHMonthy";
    return fetchDataAndLog(url, "GET", params, null, detail);
  },
  GetChartDataOfPMT: (params, detail) => {
    const url = "api/Dashboard/GetChartDataOfPMT";
    return fetchDataAndLog(url, "GET", params, null, detail);
  },
};

export default dashBoardApi;
