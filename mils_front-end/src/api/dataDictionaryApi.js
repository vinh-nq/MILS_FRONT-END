import { fetchData } from "./config/fetchApi";
const dataDictionaryApi = {
  GetAllProvince: (params) => {
    const url = "api/Dictionary/GetAllProvince";
    return fetchData(url, "GET", params, null);
  },
  InsertProvince: (data) => {
    const url = "api/Dictionary/InsertProvince";
    return fetchData(url, "POST", null, data);
  },
  UpdateProvince: (data) => {
    const url = "api/Dictionary/UpdateProvince";
    return fetchData(url, "POST", null, data);
  },
  GetAllDistrict: (params) => {
    const url = "api/Dictionary/GetAllDistrict";
    return fetchData(url, "GET", params, null);
  },
  InsertDistrict: (data) => {
    const url = "api/Dictionary/InsertDistrict";
    return fetchData(url, "POST", null, data);
  },
  UpdateDistrict: (data) => {
    const url = "api/Dictionary/UpdateDistrict";
    return fetchData(url, "POST", null, data);
  },
  GetAllVillage: (params) => {
    const url = "api/Dictionary/GetAllVillage";
    return fetchData(url, "GET", params, null);
  },
  InsertVillage: (data) => {
    const url = "api/Dictionary/InsertVillage";
    return fetchData(url, "POST", null, data);
  },
  UpdateVillage: (data) => {
    const url = "api/Dictionary/UpdateVillage";
    return fetchData(url, "POST", null, data);
  },
  GetAllWallMaterail: (params) => {
    const url = "api/Dictionary/GetAllWallMaterail";
    return fetchData(url, "GET", params, null);
  },
  InsertWallMaterail: (data) => {
    const url = "api/Dictionary/InsertWallMaterail";
    return fetchData(url, "POST", null, data);
  },
  UpdateWallMaterail: (data) => {
    const url = "api/Dictionary/UpdateWallMaterail";
    return fetchData(url, "POST", null, data);
  },
  GetAllFloorMaterail: (params) => {
    const url = "api/Dictionary/GetAllFloorMaterail";
    return fetchData(url, "GET", params, null);
  },
  InsertFloorMaterail: (data) => {
    const url = "api/Dictionary/InsertFloorMaterail";
    return fetchData(url, "POST", null, data);
  },
  UpdateFloorMaterail: (data) => {
    const url = "api/Dictionary/UpdateFloorMaterail";
    return fetchData(url, "POST", null, data);
  },
  GetAllRoofMaterail: (params) => {
    const url = "api/Dictionary/GetAllRoofMaterail";
    return fetchData(url, "GET", params, null);
  },
  InsertRoofMaterail: (data) => {
    const url = "api/Dictionary/InsertRoofMaterail";
    return fetchData(url, "POST", null, data);
  },
  UpdateRoofMaterail: (data) => {
    const url = "api/Dictionary/UpdateRoofMaterail";
    return fetchData(url, "POST", null, data);
  },
  GetAllDrinkingWater: (params) => {
    const url = "api/Dictionary/GetAllDrinkingWater";
    return fetchData(url, "GET", params, null);
  },
  InsertDrinkingWater: (data) => {
    const url = "api/Dictionary/InsertDrinkingWater";
    return fetchData(url, "POST", null, data);
  },
  UpdateDrinkingWater: (data) => {
    const url = "api/Dictionary/UpdateDrinkingWater";
    return fetchData(url, "POST", null, data);
  },
  GetAllToilet: (params) => {
    const url = "api/Dictionary/GetAllToilet";
    return fetchData(url, "GET", params, null);
  },
  InsertToilet: (data) => {
    const url = "api/Dictionary/InsertToilet";
    return fetchData(url, "POST", null, data);
  },
  UpdateToilet: (data) => {
    const url = "api/Dictionary/UpdateToilet";
    return fetchData(url, "POST", null, data);
  },
  GetAllEnergySource: (params) => {
    const url = "api/Dictionary/GetAllEnergySource";
    return fetchData(url, "GET", params, null);
  },
  InsertEnergySource: (data) => {
    const url = "api/Dictionary/InsertEnergySource";
    return fetchData(url, "POST", null, data);
  },
  UpdateEnergySource: (data) => {
    const url = "api/Dictionary/UpdateEnergySource";
    return fetchData(url, "POST", null, data);
  },
  GetAllEthnic: (params) => {
    const url = "api/Dictionary/GetAllEthnic";
    return fetchData(url, "GET", params, null);
  },
  InsertEthnic: (data) => {
    const url = "api/Dictionary/InsertEthnic";
    return fetchData(url, "POST", null, data);
  },
  UpdateEthnic: (data) => {
    const url = "api/Dictionary/UpdateEthnic";
    return fetchData(url, "POST", null, data);
  },
  GetAllLevel: (params) => {
    const url = "api/Dictionary/GetAllLevel";
    return fetchData(url, "GET", params, null);
  },
  InsertLevel: (data) => {
    const url = "api/Dictionary/InsertLevel";
    return fetchData(url, "POST", null, data);
  },
  UpdateLevel: (data) => {
    const url = "api/Dictionary/UpdateLevel";
    return fetchData(url, "POST", null, data);
  },
  GetAllClass: (params) => {
    const url = "api/Dictionary/GetAllClass";
    return fetchData(url, "GET", params, null);
  },
  InsertClass: (data) => {
    const url = "api/Dictionary/InsertClass";
    return fetchData(url, "POST", null, data);
  },
  UpdateClass: (data) => {
    const url = "api/Dictionary/UpdateClass";
    return fetchData(url, "POST", null, data);
  },
  GetAllMainJob: (params) => {
    const url = "api/Dictionary/GetAllMainJob";
    return fetchData(url, "GET", params, null);
  },
  InsertMainJob: (data) => {
    const url = "api/Dictionary/InsertMainJob";
    return fetchData(url, "POST", null, data);
  },
  UpdateMainJob: (data) => {
    const url = "api/Dictionary/UpdateMainJob";
    return fetchData(url, "POST", null, data);
  },
  GetAllBusiness: (params) => {
    const url = "api/Dictionary/GetAllBusiness";
    return fetchData(url, "GET", params, null);
  },
  InsertBusiness: (data) => {
    const url = "api/Dictionary/InsertBusiness";
    return fetchData(url, "POST", null, data);
  },
  UpdateBusiness: (data) => {
    const url = "api/Dictionary/UpdateBusiness";
    return fetchData(url, "POST", null, data);
  },
  GetAllPlotStatus: (params) => {
    const url = "api/Dictionary/GetAllPlotStatus";
    return fetchData(url, "GET", params, null);
  },
  InsertPlotStatus: (data) => {
    const url = "api/Dictionary/InsertPlotStatus";
    return fetchData(url, "POST", null, data);
  },
  UpdatePlotStatus: (data) => {
    const url = "api/Dictionary/UpdatePlotStatus";
    return fetchData(url, "POST", null, data);
  },
  GetAllPlotCause: (params) => {
    const url = "api/Dictionary/GetAllPlotCause";
    return fetchData(url, "GET", params, null);
  },
  InsertPlotCause: (data) => {
    const url = "api/Dictionary/InsertPlotCause";
    return fetchData(url, "POST", null, data);
  },
  UpdatePlotCause: (data) => {
    const url = "api/Dictionary/UpdatePlotCause";
    return fetchData(url, "POST", null, data);
  },
  GetAllPlotType: (params) => {
    const url = "api/Dictionary/GetAllPlotType";
    return fetchData(url, "GET", params, null);
  },
  InsertPlotType: (data) => {
    const url = "api/Dictionary/InsertPlotType";
    return fetchData(url, "POST", null, data);
  },
  UpdatePlotType: (data) => {
    const url = "api/Dictionary/UpdatePlotType";
    return fetchData(url, "POST", null, data);
  },
  GetAllLandType: (params) => {
    const url = "api/Dictionary/GetAllLandType";
    return fetchData(url, "GET", params, null);
  },
  InsertLandType: (data) => {
    const url = "api/Dictionary/InsertLandType";
    return fetchData(url, "POST", null, data);
  },
  UpdateLandType: (data) => {
    const url = "api/Dictionary/UpdateLandType";
    return fetchData(url, "POST", null, data);
  },
  GetAllSchoolType: (params) => {
    const url = "api/Dictionary/GetAllSchoolType";
    return fetchData(url, "GET", params, null);
  },
  InsertSchoolType: (data) => {
    const url = "api/Dictionary/InsertSchoolType";
    return fetchData(url, "POST", null, data);
  },
  UpdateSchoolType: (data) => {
    const url = "api/Dictionary/UpdateSchoolType";
    return fetchData(url, "POST", null, data);
  },
  GetAllBorrowReason: (params) => {
    const url = "api/Dictionary/GetAllBorrowReason";
    return fetchData(url, "GET", params, null);
  },
  InsertBorrowReason: (data) => {
    const url = "api/Dictionary/InsertBorrowReason";
    return fetchData(url, "POST", null, data);
  },
  UpdateBorrowReason: (data) => {
    const url = "api/Dictionary/UpdateBorrowReason";
    return fetchData(url, "POST", null, data);
  },
  GetAllMainGoodsServices: (params) => {
    const url = "api/Dictionary/GetAllMainGoodsServices";
    return fetchData(url, "GET", params, null);
  },
  InsertMainGoodsServices: (data) => {
    const url = "api/Dictionary/InsertMainGoodsServices";
    return fetchData(url, "POST", null, data);
  },
  UpdateMainGoodsServices: (data) => {
    const url = "api/Dictionary/UpdateMainGoodsServices";
    return fetchData(url, "POST", null, data);
  },
  GetAllCookingSource: (params) => {
    const url = "api/Dictionary/GetAllCookingSource";
    return fetchData(url, "GET", params, null);
  },
  GetAllTypeOfLender: (params) => {
    const url = "api/Dictionary/GetAllTypeOfLender";
    return fetchData(url, "GET", params, null);
  },
};
export default dataDictionaryApi;
