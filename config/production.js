'use strict';

const configDefault = require('./default');

const config = {
    debug: false,
    port: process.env.PORT
}

module.exports = {...configDefault, ...config };
