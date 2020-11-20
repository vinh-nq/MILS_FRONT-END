import { fetchData } from "./config/fetchApi";

const householdScoreApi = {
  getAllHouseholdScore: (params) => {
    const url = "api/HouseHoldCCT/GetPMTScored";
    return fetchData(url, "GET", params, null);
  },
};

export default householdScoreApi;
