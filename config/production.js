'use strict';

const configDefault = require('./default');

const config = {
    debug: false,
    port: process.env.PORT,
    staticBasePath: `//tall-tale-cdn.surge.sh/`
}

module.exports = {...configDefault, ...config };
