const axios = require('axios');

const ApiService = {
    get: async function (url) {
        console.log("ApiServer.get: ", url);
        let result = await axios.get(url);
        return result;
    }
};

export { ApiService };


