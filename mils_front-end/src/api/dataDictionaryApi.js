import { fetchData, fetchDataAndLog } from "./config/fetchApi";
const dataDictionaryApi = {
  GetAllProvince: (params) => {
    const url = "api/Dictionary/GetAllProvince";
    return fetchData(url, "GET", params, null);
  },
  InsertProvince: (data, detail) => {
    const url = "api/Dictionary/InsertProvince";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateProvince: (data, detail) => {
    const url = "api/Dictionary/UpdateProvince";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllDistrict: (params) => {
    const url = "api/Dictionary/GetAllDistrict";
    return fetchData(url, "GET", params, null);
  },
  InsertDistrict: (data, detail) => {
    const url = "api/Dictionary/InsertDistrict";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateDistrict: (data, detail) => {
    const url = "api/Dictionary/UpdateDistrict";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllVillage: (params) => {
    const url = "api/Dictionary/GetAllVillage";
    return fetchData(url, "GET", params, null);
  },
  InsertVillage: (data, detail) => {
    const url = "api/Dictionary/InsertVillage";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateVillage: (data, detail) => {
    const url = "api/Dictionary/UpdateVillage";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllWallMaterail: (params) => {
    const url = "api/Dictionary/GetAllWallMaterail";
    return fetchData(url, "GET", params, null);
  },
  InsertWallMaterail: (data, detail) => {
    const url = "api/Dictionary/InsertWallMaterail";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateWallMaterail: (data, detail) => {
    const url = "api/Dictionary/UpdateWallMaterail";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllFloorMaterail: (params) => {
    const url = "api/Dictionary/GetAllFloorMaterail";
    return fetchData(url, "GET", params, null);
  },
  InsertFloorMaterail: (data, detail) => {
    const url = "api/Dictionary/InsertFloorMaterail";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateFloorMaterail: (data, detail) => {
    const url = "api/Dictionary/UpdateFloorMaterail";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllRoofMaterail: (params) => {
    const url = "api/Dictionary/GetAllRoofMaterail";
    return fetchData(url, "GET", params, null);
  },
  InsertRoofMaterail: (data, detail) => {
    const url = "api/Dictionary/InsertRoofMaterail";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateRoofMaterail: (data, detail) => {
    const url = "api/Dictionary/UpdateRoofMaterail";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllDrinkingWater: (params) => {
    const url = "api/Dictionary/GetAllDrinkingWater";
    return fetchData(url, "GET", params, null);
  },
  InsertDrinkingWater: (data, detail) => {
    const url = "api/Dictionary/InsertDrinkingWater";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateDrinkingWater: (data, detail) => {
    const url = "api/Dictionary/UpdateDrinkingWater";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllToilet: (params) => {
    const url = "api/Dictionary/GetAllToilet";
    return fetchData(url, "GET", params, null);
  },
  InsertToilet: (data, detail) => {
    const url = "api/Dictionary/InsertToilet";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateToilet: (data, detail) => {
    const url = "api/Dictionary/UpdateToilet";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllEnergySource: (params) => {
    const url = "api/Dictionary/GetAllEnergySource";
    return fetchData(url, "GET", params, null);
  },
  InsertEnergySource: (data, detail) => {
    const url = "api/Dictionary/InsertEnergySource";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateEnergySource: (data, detail) => {
    const url = "api/Dictionary/UpdateEnergySource";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllEthnic: (params) => {
    const url = "api/Dictionary/GetAllEthnic";
    return fetchData(url, "GET", params, null);
  },
  InsertEthnic: (data, detail) => {
    const url = "api/Dictionary/InsertEthnic";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateEthnic: (data, detail) => {
    const url = "api/Dictionary/UpdateEthnic";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllLevel: (params) => {
    const url = "api/Dictionary/GetAllLevel";
    return fetchData(url, "GET", params, null);
  },
  InsertLevel: (data, detail) => {
    const url = "api/Dictionary/InsertLevel";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateLevel: (data, detail) => {
    const url = "api/Dictionary/UpdateLevel";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllClass: () => {
    const url = "api/Dictionary/GetAllClass";
    return fetchData(url, "GET", null, null);
  },
  InsertClass: (data, detail) => {
    const url = "api/Dictionary/InsertClass";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateClass: (data, detail) => {
    const url = "api/Dictionary/UpdateClass";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllMainJob: (params) => {
    const url = "api/Dictionary/GetAllMainJob";
    return fetchData(url, "GET", params, null);
  },
  InsertMainJob: (data, detail) => {
    const url = "api/Dictionary/InsertMainJob";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateMainJob: (data, detail) => {
    const url = "api/Dictionary/UpdateMainJob";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllBusiness: (params) => {
    const url = "api/Dictionary/GetAllBusiness";
    return fetchData(url, "GET", params, null);
  },
  InsertBusiness: (data, detail) => {
    const url = "api/Dictionary/InsertBusiness";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateBusiness: (data, detail) => {
    const url = "api/Dictionary/UpdateBusiness";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllPlotStatus: (params) => {
    const url = "api/Dictionary/GetAllPlotStatus";
    return fetchData(url, "GET", params, null);
  },
  InsertPlotStatus: (data, detail) => {
    const url = "api/Dictionary/InsertPlotStatus";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdatePlotStatus: (data, detail) => {
    const url = "api/Dictionary/UpdatePlotStatus";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllPlotCause: (params) => {
    const url = "api/Dictionary/GetAllPlotCause";
    return fetchData(url, "GET", params, null);
  },
  InsertPlotCause: (data, detail) => {
    const url = "api/Dictionary/InsertPlotCause";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdatePlotCause: (data, detail) => {
    const url = "api/Dictionary/UpdatePlotCause";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllPlotType: (params) => {
    const url = "api/Dictionary/GetAllPlotType";
    return fetchData(url, "GET", params, null);
  },
  InsertPlotType: (data, detail) => {
    const url = "api/Dictionary/InsertPlotType";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdatePlotType: (data, detail) => {
    const url = "api/Dictionary/UpdatePlotType";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllLandType: (params) => {
    const url = "api/Dictionary/GetAllLandType";
    return fetchData(url, "GET", params, null);
  },
  InsertLandType: (data, detail) => {
    const url = "api/Dictionary/InsertLandType";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateLandType: (data, detail) => {
    const url = "api/Dictionary/UpdateLandType";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllSchoolType: (params) => {
    const url = "api/Dictionary/GetAllSchoolType";
    return fetchData(url, "GET", params, null);
  },
  InsertSchoolType: (data, detail) => {
    const url = "api/Dictionary/InsertSchoolType";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateSchoolType: (data, detail) => {
    const url = "api/Dictionary/UpdateSchoolType";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllBorrowReason: (params) => {
    const url = "api/Dictionary/GetAllBorrowReason";
    return fetchData(url, "GET", params, null);
  },
  InsertBorrowReason: (data, detail) => {
    const url = "api/Dictionary/InsertBorrowReason";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateBorrowReason: (data, detail) => {
    const url = "api/Dictionary/UpdateBorrowReason";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllMainGoodsServices: (params) => {
    const url = "api/Dictionary/GetAllMainGoodsServices";
    return fetchData(url, "GET", params, null);
  },
  InsertMainGoodsServices: (data, detail) => {
    const url = "api/Dictionary/InsertMainGoodsServices";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateMainGoodsServices: (data, detail) => {
    const url = "api/Dictionary/UpdateMainGoodsServices";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllCookingSource: (params) => {
    const url = "api/Dictionary/GetAllCookingSource";
    return fetchData(url, "GET", params, null);
  },
  InsertCookingSource: (data, detail) => {
    const url = "api/Dictionary/InsertCookingSource";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateCookingSource: (data, detail) => {
    const url = "api/Dictionary/UpdateCookingSource";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllTypeOfLender: (params) => {
    const url = "api/Dictionary/GetAllTypeOfLender";
    return fetchData(url, "GET", params, null);
  },
  InsertTypeOfLender: (data, detail) => {
    const url = "api/Dictionary/InsertTypeOfLender";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateTypeOfLender: (data, detail) => {
    const url = "api/Dictionary/UpdateTypeOfLender";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllMaritalStatus: (params) => {
    const url = "api/Dictionary/GetAllMaritalStatus";
    return fetchData(url, "GET", params, null);
  },
  InsertMaritalStatus: (data, detail) => {
    const url = "api/Dictionary/InsertMaritalStatus";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateMaritalStatus: (data, detail) => {
    const url = "api/Dictionary/UpdateMaritalStatus";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllRelation: (params) => {
    const url = "api/Dictionary/GetAllRelation";
    return fetchData(url, "GET", params, null);
  },
  InsertRelation: (data, detail) => {
    const url = "api/Dictionary/InsertRelation";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateRelation: (data, detail) => {
    const url = "api/Dictionary/UpdateRelation";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllDisability: (params) => {
    const url = "api/Dictionary/GetAllDisability";
    return fetchData(url, "GET", params, null);
  },
  InsertDisability: (data, detail) => {
    const url = "api/Dictionary/InsertDisability";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateDisability: (data, detail) => {
    const url = "api/Dictionary/UpdateDisability";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllSchoolEnroll: (params) => {
    const url = "api/Dictionary/GetAllSchoolEnroll";
    return fetchData(url, "GET", params, null);
  },
  InsertSchoolEnroll: (data, detail) => {
    const url = "api/Dictionary/InsertSchoolEnroll";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateSchoolEnroll: (data, detail) => {
    const url = "api/Dictionary/UpdateSchoolEnroll";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllGender: (params) => {
    const url = "api/Dictionary/GetAllGender";
    return fetchData(url, "GET", params, null);
  },
  GetAllAreaMateral: (params) => {
    const url = "api/Dictionary/GetAllAreaMateral";
    return fetchData(url, "GET", params, null);
  },
  InsertAreaMateral: (data, detail) => {
    const url = "api/Dictionary/InsertAreaMateral";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateAreaMateral: (data, detail) => {
    const url = "api/Dictionary/UpdateAreaMateral";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllSafetyArea: (params) => {
    const url = "api/Dictionary/GetAllSafetyArea";
    return fetchData(url, "GET", params, null);
  },
  InsertSafetyArea: (data, detail) => {
    const url = "api/Dictionary/InsertSafetyArea";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateSafetyArea: (data, detail) => {
    const url = "api/Dictionary/UpdateSafetyArea";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllCCTConfirmStatus: (params) => {
    const url = "api/Dictionary/GetAllCCTConfirmStatus";
    return fetchData(url, "GET", params, null);
  },
  InsertCCTConfirmStatus: (data, detail) => {
    const url = "api/Dictionary/InsertCCTConfirmStatus";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateCCTConfirmStatus: (data, detail) => {
    const url = "api/Dictionary/UpdateCCTConfirmStatus";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllWater: (params) => {
    const url = "api/Dictionary/GetAllWater";
    return fetchData(url, "GET", params, null);
  },
  InsertWater: (data, detail) => {
    const url = "api/Dictionary/InsertWater";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateWater: (data, detail) => {
    const url = "api/Dictionary/UpdateWater";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllWaterDry: (params) => {
    const url = "api/Dictionary/GetAllWaterDry";
    return fetchData(url, "GET", params, null);
  },
  InsertWaterDry: (data, detail) => {
    const url = "api/Dictionary/InsertWaterDry";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateWaterDry: (data, detail) => {
    const url = "api/Dictionary/UpdateWaterDry";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetAllUnit: (params) => {
    const url = "api/Dictionary/GetAllUnit";
    return fetchData(url, "GET", params, null);
  },
  InsertUnit: (data, detail) => {
    const url = "api/Dictionary/InsertUnit";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
};
export default dataDictionaryApi;
