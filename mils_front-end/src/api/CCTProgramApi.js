import { fetchData } from "./config/fetchApi";
const CCTProgramApi = {
  GetPMTScored: (params) => {
    const url = "api/HouseHoldCCT/GetPMTScored";
    return fetchData(url, "GET", params, null);
  },
};
export default CCTProgramApi;
