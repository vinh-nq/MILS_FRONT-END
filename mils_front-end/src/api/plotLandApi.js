import {fetchData} from "./config/fetchApi";

const plotLandApi = {
    add: (data) => {
        const url = 'api/HouseHold/AddPlotLand';
        return fetchData(url, 'POST', null, data);
    },
    update: (data) => {
        const url = 'api/HouseHold/UpdatePlotLand';
        return fetchData(url, 'POST', null, data);
    },
    delete: (params) => {
        const url = 'api/HouseHold/DeletePlotLand';
        return fetchData(url, 'GET', params, null);
    },
}

export default plotLandApi;