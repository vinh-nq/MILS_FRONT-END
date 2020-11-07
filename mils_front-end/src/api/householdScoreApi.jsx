import { fetchData } from "./config/fetchApi";

const houseHoldScoreApi = {
  getAllHouseholdScore: () => {
    const url = "api/HouseHoldCCT/GetPMTScored";
    return fetchData(url, "GET", null, null);
  },
};

export default houseHoldScoreApi;
