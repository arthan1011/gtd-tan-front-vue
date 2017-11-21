/**
 * Created by arthan on 21.11.2017.
 */

axios = require('axios');

module.exports = axios.create({
    baseURL: 'http://localhost:8080'
});