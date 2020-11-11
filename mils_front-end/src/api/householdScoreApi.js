import { fetchData } from "./config/fetchApi";

const householdScoreApi = {
  getAllHouseholdScore: () => {
    const url = "api/HouseHoldCCT/GetPMTScored";
    return fetchData(url, "GET", null, null);
  },
};

export default householdScoreApi;
