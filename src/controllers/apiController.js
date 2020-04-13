"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dbAdapter_1 = require("../dbAdapter");
var errors_1 = require("./errors");
var config_1 = require("config");
function getHashTagEnText(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var hashTagRu, hashTagEn, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    hashTagRu = req.params.hashTagRu;
                    return [4 /*yield*/, dbAdapter_1.getHashTagEnTextFromBd(hashTagRu)];
                case 1:
                    hashTagEn = _a.sent();
                    res.send(hashTagEn);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    if (e_1 instanceof errors_1.PageError) {
                        next(e_1);
                    }
                    else {
                        next(new errors_1.PageError('500'));
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getHashTagEnText = getHashTagEnText;
function getJsonAdventuresPack(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var staticBasePath_1, limit, skip, hashTagEn, adventuresForLoad, adventures, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    staticBasePath_1 = req.locals.staticBasePath;
                    limit = req.query.limit === undefined
                        ? config_1["default"].get('defaultAdventuresInPackCount')
                        : Number.parseInt(req.query.limit);
                    skip = req.query.skip === undefined
                        ? 0
                        : Number.parseInt(req.query.skip);
                    hashTagEn = req.query.hashtag;
                    return [4 /*yield*/, dbAdapter_1.getAdventuresIdsByHashTags(limit, skip, hashTagEn)];
                case 1:
                    adventuresForLoad = _a.sent();
                    if (adventuresForLoad.length === 0) {
                        res.json([]);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, dbAdapter_1.getAdventures(adventuresForLoad)];
                case 2:
                    adventures = _a.sent();
                    result = adventures.map(function (adventure) {
                        var hashTags = adventure.hashTags === undefined ? [] : adventure.hashTags;
                        return {
                            id: adventure.id,
                            name: adventure.name,
                            adventureUrl: adventure.urlText,
                            staticBasePath: staticBasePath_1,
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            imageName: adventure.imageName,
                            description: adventure.description,
                            hashTags: hashTags
                        };
                    });
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    if (e_2 instanceof errors_1.PageError) {
                        next(e_2);
                    }
                    else {
                        next(new errors_1.PageError('500'));
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getJsonAdventuresPack = getJsonAdventuresPack;
