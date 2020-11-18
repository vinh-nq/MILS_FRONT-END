import { fetchData } from "./config/fetchApi";

const dashBoardApi = {
  CountHH: (data) => {
    const url = "api/Dashboard/CountHH";
    return fetchData(url, "GET", data, null);
  },
  GetChartDataHHMonthy: (params) => {
    const url = "api/Dashboard/GetChartDataHHMonthy";
    return fetchData(url, "GET", params, null);
  },
  GetChartDataOfPMT: (params) => {
    const url = "api/Dashboard/GetChartDataOfPMT";
    return fetchData(url, "GET", params, null);
  },
};

export default dashBoardApi;
