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
}

export default plotLandApi;