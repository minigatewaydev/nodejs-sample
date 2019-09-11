var httpResp = require('../models/SimpleHttpResponse').prop;

var methods = {
    sendUsingPostAxiosAsync: async function (mt, url) {
        const axios = require('axios').default;
        try {

            var data = {
                'gw-username': mt.username,
                'gw-password': mt.password,
                'gw-from': mt.from,
                'gw-to': mt.to,
                'gw-text': mt.text,
                'gw-dlr-mask': mt.dlrMask,
                'gw-dlr-url': mt.dlrUrl,
                'gw-resp-type': mt.responseType
            }

            const response = await axios.post(url, data);

            httpResp.statusCode = await response.status;
            httpResp.responseContentString = await response.data;
        } catch (error) {
            httpResp.error = error;
        }

        return httpResp;
    },

    sendUsingGetNodeFetchAsync: async function (url) {
        const fetch = require('node-fetch').default;

        try {
            const response = await fetch(url);

            httpResp.statusCode = await response.status;
            httpResp.responseContentString = await response.text();
        } catch (error) {
            httpResp.error = error;
        }

        return httpResp;
    },

    sendUsingGetAxiosAsync: async function (url) {
        const axios = require('axios').default;

        try {
            const response = await axios.get(url);

            httpResp.statusCode = await response.status;
            httpResp.responseContentString = await response.statusText;
        } catch (error) {
            httpResp.error = error;
        }

        return httpResp;
    }
};

exports.methods = methods;