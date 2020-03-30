'use strict';

const packageMeta = require('../package.json');

module.exports = {
    debug: false,
    port: process.env.PORT,
    staticBasePath: `//tall-tale-cdn.surge.sh/`
};
