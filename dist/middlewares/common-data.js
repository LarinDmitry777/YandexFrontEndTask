"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("config"));
exports.default = (req, _res, next) => {
    req.locals = {
        lang: 'ru',
        meta: {
            charset: 'utf-8',
            description: 'TellTailGames2'
        },
        title: 'TellTailGames2',
        staticBasePath: config_1.default.get('staticBasePath')
    };
    next();
};
//# sourceMappingURL=common-data.js.map