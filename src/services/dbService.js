const axios = require('axios');
const config = require('../servers/config.json');

function isValidUser(data, password) {
    if (data.length === 1 && data[0].password === password) {
        return true;
    }
    return false;
}

/**
 * used on both back-end and front-end
 */
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
    },
    authenticateUser: async function (email, password) {
        if (!DBService.instance) {
            DBService.initialize();
        }
        let result = await DBService.instance.get(`/users?q=${email}`);
        return isValidUser(result.data, password);
    }
};

module.exports = DBService;


