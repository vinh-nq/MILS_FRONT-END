import { fetchData } from "./config/fetchApi";

const getCutOff = {
  getAll: (params) => {
    const url = "api/HouseHoldCCT/GetCutOff";
    return fetchData(url, "GET", params, null);
  },
};

export default getCutOff;
