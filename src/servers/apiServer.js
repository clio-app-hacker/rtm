import axios from 'axios';

const axios = require('axios');

const ApiServer = {

    get: async (url) => {
        console.log("ApiServer.get: ", url);
        let result = await axios.get(url);
        return result;
    }
};

export default { ApiServer };
