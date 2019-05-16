const axios = require('axios');
const config = require('../servers/config.json');

const ApiService = {
    instance: null,
    initialize: (token) => {
        console.log(`Initialize axios with bearer token : ${token}`);
        ApiService.instance = axios.create({
            baseURL: config.apiHost,
            headers: { 'Authorization': `Bearer ${token}` }
        });
    },
    get: async (url) => {
        console.log("ApiService.get: ", url);
        if (!ApiService.instance) {
            console.error("No Axios instance, need to initialize ApiService !")
        }
        let result = await ApiService.instance.get(url);
        return result;
    }
};

module.exports=  ApiService;
