import {fetchData} from "./config/fetchApi";


const houseHoldApi = {
    getAllProvince: () => {
        const url = 'api/Map/GetAllProvince';
        return fetchData(url, 'GET', null, null);
    },
    getAllDistrict: (params) => {
        const url = 'api/Map/GetAllDistrict';
        return fetchData(url, 'GET', params, null);
    },
    getAllVillage: (params) => {
        const url = 'api/Map/GetAllVillage';
        return fetchData(url, 'GET', params, null);
    },
    getAllUnit: (params) => {
        const url = 'api/Map/GetAllUnit';
        return fetchData(url, 'GET', params, null);
    },
    searchHouseHold: (params) => {
        const url = 'api/HouseHold/SearchHouseHold';
        return fetchData(url, 'GET', params, null);
    },
    getMembersInHouseHold: (params) => {
        const url = 'api/HouseHold/GetMembersByHouseHold';
        return fetchData(url, 'GET', params, null);
    },
    getInformationOfIndividualMember: (params) => {
        const url = 'api/HouseHold/GetInformationOfIndividualMember';
        return fetchData(url, 'GET', params, null);
    },
    getPlotLandsByHouseHold: (params) => {
        const url = 'api/HouseHold/GetPlotLandsByHouseHold';
        return fetchData(url, 'GET', params, null);
    },
    getDetailHouseHold: (params) => {
        const url = 'api/HouseHold/GetDetailHouseHold';
        return fetchData(url, 'GET', params, null);
    },
    updateHouseHold: (data) => {
        const url = 'api/HouseHold/UpdateHouseHold';
        return fetchData(url, 'POST', null, data);
    },
    getInformationOfIndividualPlotLand: (params) => {
        const url = 'api/HouseHold/GetInformationOfIndividualPlotLand';
        return fetchData(url, 'GET', params, null);
    },
}

export default houseHoldApi;