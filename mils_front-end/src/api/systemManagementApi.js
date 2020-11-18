import { fetchData } from "./config/fetchApi";

const systemManagementApi = {
  GetSystemParameters: (params) => {
    const url = "api/System/GetSystemParameters";
    return fetchData(url, "GET", params, null);
  },
};

export default systemManagementApi;
