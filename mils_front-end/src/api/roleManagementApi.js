import { fetchDataAndLog } from "./config/fetchApi";
const roleManagementApi = {
  GetAllRole: () => {
    const url = "api/User/GetAllRole";
    return fetchDataAndLog(url, "GET", null, null, "Get List Role");
  },
  InsertPermission: (data) => {
    const url = "api/User/InsertPermission";
    return fetchDataAndLog(url, "POST", null, data, "Update Permistion for Role");
  },
  InsertRole: (data, detail) => {
    const url = "api/User/InsertRole";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  UpdateRole: (data, detail) => {
    const url = "api/User/UpdateRole";
    return fetchDataAndLog(url, "POST", null, data, detail);
  },
  GetRoleById: (params, detail) => {
    const url = "api/User/GetRoleById";
    return fetchDataAndLog(url, "GET", params, null, detail);
  },
};

export default roleManagementApi;
