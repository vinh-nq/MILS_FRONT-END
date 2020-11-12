import { fetchData, fetchDataAndLog } from "./config/fetchApi";

const houseHoldApi = {
  getAllProvince: () => {
    const url = "api/Map/GetAllProvince";
    return fetchData(url, "GET", null, null);
  },
  getAllDistrict: (params) => {
    const url = "api/Map/GetAllDistrict";
    return fetchData(url, "GET", params, null);
  },
  getAllVillage: (params) => {
    const url = "api/Map/GetAllVillage";
    return fetchData(url, "GET", params, null);
  },
  getAllUnit: (params) => {
    const url = "api/Map/GetAllUnit";
    return fetchData(url, "GET", params, null);
  },
  searchHouseHold: (params) => {
    const url = "api/HouseHold/SearchHouseHold";
    return fetchData(url, "GET", params, null);
  },
  getMembersInHouseHold: (params) => {
    const url = "api/HouseHold/GetMembersByHouseHold";
    return fetchData(url, "GET", params, null);
  },
  getInformationOfIndividualMember: (params) => {
    const url = "api/HouseHold/GetInformationOfIndividualMember";
    return fetchData(url, "GET", params, null);
  },
  getPlotLandsByHouseHold: (params) => {
    const url = "api/HouseHold/GetPlotLandsByHouseHold";
    return fetchData(url, "GET", params, null);
  },
  getDetailHouseHold: (params) => {
    const url = "api/HouseHold/GetDetailHouseHold";
    return fetchData(url, "GET", params, null);
  },

  addHouseHold: (data, detail) => {
    const url = "api/HouseHold/AddHouseHold";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  updateHouseHold: (data) => {
    const url = "api/HouseHold/UpdateHouseHold";
    return fetchDataAndLog(
      url,
      "POST",
      null,
      data,
      `Update Information Household`
    );
  },
  CheckInsertMember: (data) => {
    const url = "api/CCTProgram/CheckInsertMember";
    return fetchDataAndLog(
      url,
      "POST",
      null,
      data,
      `Check Status CCT Member Of List People In HouseHold`
    );
  },
  InsertMemberCCT: (data, detail) => {
    const url = "api/CCTProgram/InsertMemberCCT";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  deleteHouseHold: (params) => {
    const url = "api/HouseHold/DeleteHouseHold";
    return fetchDataAndLog(url, "GET", params, null, "Delete Household");
  },
  addMember: (data) => {
    const url = "api/HouseHold/AddMember";
    return fetchDataAndLog(
      url,
      "POST",
      null,
      data,
      "Add New Member In Household"
    );
  },
  updateMember: (data) => {
    const url = "api/HouseHold/UpdateMember";
    return fetchDataAndLog(
      url,
      "POST",
      null,
      data,
      "Update Member In Household"
    );
  },
  deleteMember: (params) => {
    const url = "api/HouseHold/DeleteMember";
    return fetchDataAndLog(url, "GET", params, "Delete Member In Household");
  },
  getInformationOfIndividualPlotLand: (params) => {
    const url = "api/HouseHold/GetInformationOfIndividualPlotLand";
    return fetchData(url, "GET", params, null);
  },
};

export default houseHoldApi;
