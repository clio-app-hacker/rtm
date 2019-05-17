const axios = require('axios');
const config = require('../servers/config.json');

const DBService = {
    instance: null,
    initialize: () => {

        DBService.instance = axios.create({
            baseURL: config.dbHost,
        });
    },
    get: async function (url) {
        if (!DBService.instance) {
            DBService.initialize();
        }
        console.log("DBService.get: ", url);
        let result = await DBService.instance.get(url);
        return result;
    },
    post: async function (url, data) {
        if (!DBService.instance) {
            DBService.initialize();
        }
        console.log("DBService.post: ", url, data);
        let result = await DBService.instance.post(url, data);
        return result;
    },
    delete: async function (url) {
        if (!DBService.instance) {
            DBService.initialize();
        }
        console.log("DBService.delete: ", url);
        let result = await DBService.instance.delete(url);
        return result;
    }
};

export { DBService };


