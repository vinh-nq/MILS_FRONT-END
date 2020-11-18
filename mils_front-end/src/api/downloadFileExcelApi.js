import { fetchDataAndLog } from "./config/fetchApi";
const downloadFileExcelApi = {
  ExportMembers: (params) => {
    const url = "api/HouseHold/ExportMemberV2";
    return fetchDataAndLog(
      url,
      "GET",
      params,
      null,
      "Export File Excel Member and Plot Land"
    );
  },
  ExportHHCCTConfirm: (params) => {
    const url = "api/HouseHoldCCT/ExportHHCCTConfirm";
    return fetchDataAndLog(
      url,
      "GET",
      params,
      null,
      "Export File Excel List Household In CCT Program"
    );
  },
  ExportF1ResultForm: (params) => {
    const url = "api/HouseHold/ExportF1ResultForm";
    return fetchDataAndLog(
      url,
      "GET",
      params,
      null,
      "Export File Excel Member and Plot Land"
    );
  },
};
export default downloadFileExcelApi;
