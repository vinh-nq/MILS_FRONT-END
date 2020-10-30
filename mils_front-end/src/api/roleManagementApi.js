import {fetchData} from './config/fetchApi';
const roleManagementApi = {
    GetAllRole: () => {
        const url = 'api/User/GetAllRole';
        return fetchData(url, 'GET', null, null);
    },
}

export default roleManagementApi;