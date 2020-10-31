import { fetchData } from "./config/fetchApi";
const roleManagementApi = {
  GetAllRole: () => {
    const url = "api/User/GetAllRole";
    return fetchData(url, "GET", null, null);
  },
  InsertPermission: (data) => {
    const url = "api/User/InsertPermission";
    return fetchData(url, "POST", null, data);
  },
  InsertRole: (data) => {
    const url = "api/User/InsertRole";
    return fetchData(url, "POST", null, data);
  },
  UpdateRole: (data) => {
    const url = "api/User/UpdateRole";
    return fetchData(url, "POST", null, data);
  },
  GetRoleById: (params) => {
    const url = "api/User/GetRoleById";
    return fetchData(url, "GET", params, null);
  },
};

export default roleManagementApi;
