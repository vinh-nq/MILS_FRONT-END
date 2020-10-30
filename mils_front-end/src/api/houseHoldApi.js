import {fetchData} from "./config/fetchApi";


const houseHoldApi = {
    getAllProvince: () => {
        const url = 'api/Map/GetAllProvince';
        return fetchData(url, 'GET', null, null);
    },
    getAllDistrict: () => {
        const url = 'api/Map/GetAllDistrict';
        return fetchData(url, 'GET', null, null);
    },
    getAllVillage: () => {
        const url = 'api/Map/GetAllVillage';
        return fetchData(url, 'GET', null, null);
    },
    getAllUnit: () => {
        const url = 'api/Map/GetAllUnit';
        return fetchData(url, 'GET', null, null);
    },
    searchHouseHold: () => {
        const url = 'api/HouseHold/SearchHouseHold';
        return fetchData(url, 'GET', null, null);
    },
}

export default houseHoldApi;