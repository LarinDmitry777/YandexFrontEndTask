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
var sequelize_typescript_1 = require("sequelize-typescript");
var Achievement_1 = require("./models/Achievement");
var Scene_1 = require("./models/Scene");
var TextPosition_1 = require("./models/TextPosition");
var HashTag_1 = require("./models/HashTag");
var Action_1 = require("./models/Action");
var Adventure_1 = require("./models/Adventure");
var AdventureToHashTag_1 = require("./models/AdventureToHashTag");
var SceneToAchievement_1 = require("./models/SceneToAchievement");
var sequelize_1 = require("sequelize");
var SceneToAchievement_2 = require("./models/SceneToAchievement");
var bdKeys_json_1 = require("./bdKeys.json");
var HastTagView_1 = require("./models/HastTagView");
var AdventuresView_1 = require("./models/AdventuresView");
var AdventuresView_2 = require("./models/AdventuresView");
var config_1 = require("config");
function initDb() {
    var sequelizeOptions = bdKeys_json_1["default"];
    sequelizeOptions.dialect = 'postgres';
    sequelizeOptions.models = [
        Achievement_1["default"],
        Scene_1["default"],
        TextPosition_1["default"],
        HashTag_1["default"],
        Action_1["default"],
        Adventure_1["default"],
        AdventureToHashTag_1["default"],
        SceneToAchievement_1["default"],
        HastTagView_1["default"],
        AdventuresView_1["default"]
    ];
    new sequelize_typescript_1.Sequelize(sequelizeOptions);
}
exports.initDb = initDb;
function addDefaultImageToAdventures(adventures) {
    adventures.forEach(function (adveture) {
        if (adveture.imageName === null) {
            adveture.imageName = config_1["default"].get('defaultAdventureImage');
        }
    });
    return adventures;
}
function getHashTagEnTextFromBd(textRu) {
    return __awaiter(this, void 0, void 0, function () {
        var hashTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HashTag_1["default"].findOne({
                        where: {
                            textRu: textRu
                        }
                    })];
                case 1:
                    hashTag = _a.sent();
                    return [2 /*return*/, hashTag === null ? '' : hashTag.textEn];
            }
        });
    });
}
exports.getHashTagEnTextFromBd = getHashTagEnTextFromBd;
function getHashTagByEnText(hashTagTextEn) {
    return __awaiter(this, void 0, void 0, function () {
        var hashTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HashTag_1["default"].findOne({
                        where: {
                            textEn: hashTagTextEn
                        }
                    })];
                case 1:
                    hashTag = _a.sent();
                    if (hashTag == null) {
                        return [2 /*return*/, {
                                textEn: '',
                                textRu: ''
                            }];
                    }
                    return [2 /*return*/, {
                            textRu: hashTag.textRu,
                            textEn: hashTag.textEn
                        }];
            }
        });
    });
}
exports.getHashTagByEnText = getHashTagByEnText;
function getHashTagsFromManyAdventures(adventureIds) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, HastTagView_1["default"].findAll({
                        where: {
                            adventureId: (_a = {},
                                _a[sequelize_1.Op.or] = adventureIds,
                                _a)
                        }
                    })];
                case 1: return [2 /*return*/, (_b.sent()).map(function (hashTagObject) {
                        return {
                            textRu: hashTagObject.textRu,
                            textEn: hashTagObject.textEn,
                            adventureId: hashTagObject.adventureId
                        };
                    })];
            }
        });
    });
}
function getAdventuresIdsByHashTags(limit, offset, hashTagTextEn) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(hashTagTextEn !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, HastTagView_1["default"].findAll({
                            limit: limit,
                            offset: offset,
                            where: {
                                textEn: hashTagTextEn
                            }
                        })];
                case 1: return [2 /*return*/, (_a.sent()).map(function (hashTagObject) { return hashTagObject.adventureId; })];
                case 2: return [4 /*yield*/, AdventuresView_2["default"].findAll({
                        limit: limit,
                        offset: offset
                    })];
                case 3: return [2 /*return*/, (_a.sent()).map(function (adventureObject) { return adventureObject.id; })];
            }
        });
    });
}
exports.getAdventuresIdsByHashTags = getAdventuresIdsByHashTags;
function getAdventures(adventuresIds) {
    return __awaiter(this, void 0, void 0, function () {
        var searchOptions, adventures, loadedAdventuresIds, hashTags;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    searchOptions = {};
                    if (adventuresIds !== undefined) {
                        searchOptions = {
                            id: (_a = {},
                                _a[sequelize_1.Op.or] = adventuresIds,
                                _a)
                        };
                    }
                    return [4 /*yield*/, AdventuresView_1["default"].findAll({
                            where: searchOptions
                        })];
                case 1:
                    adventures = (_b.sent()).map(function (adventure) {
                        return {
                            id: adventure.id,
                            imageName: adventure.imageName,
                            description: adventure.description,
                            name: adventure.name,
                            urlText: adventure.urlText,
                            hashTags: []
                        };
                    });
                    loadedAdventuresIds = adventures.map(function (adventure) { return adventure.id; });
                    return [4 /*yield*/, getHashTagsFromManyAdventures(loadedAdventuresIds)];
                case 2:
                    hashTags = _b.sent();
                    hashTags.forEach(function (hashTag) {
                        var _a;
                        var adventure = adventures.find(function (x) { return x.id === hashTag.adventureId; });
                        (_a = adventure === null || adventure === void 0 ? void 0 : adventure.hashTags) === null || _a === void 0 ? void 0 : _a.push(hashTag);
                    });
                    addDefaultImageToAdventures(adventures);
                    return [2 /*return*/, adventures];
            }
        });
    });
}
exports.getAdventures = getAdventures;
function getAdventuresByHashTag(hashTagTextEn) {
    return __awaiter(this, void 0, void 0, function () {
        var adventureIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HastTagView_1["default"].findAll({
                        where: {
                            textEn: hashTagTextEn
                        }
                    })];
                case 1:
                    adventureIds = (_a.sent()).map(function (hashTagObject) { return hashTagObject.adventureId; });
                    return [4 /*yield*/, getAdventures(adventureIds)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAdventuresByHashTag = getAdventuresByHashTag;
function getAchievements(sceneId, adventureUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var achievementsIds;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, SceneToAchievement_2["default"].findAll({
                        where: {
                            adventureUrl: adventureUrl,
                            sceneId: sceneId
                        }
                    })];
                case 1:
                    achievementsIds = (_b.sent()).map(function (data) { return data.achievementId; });
                    if (achievementsIds.length == 0) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, Achievement_1["default"].findAll({
                            where: {
                                id: (_a = {},
                                    _a[sequelize_1.Op.or] = achievementsIds,
                                    _a)
                            }
                        })];
                case 2: return [2 /*return*/, (_b.sent()).map(function (achievementObject) {
                        return {
                            text: achievementObject.text,
                            imageName: achievementObject.imageName,
                            id: achievementObject.id
                        };
                    })];
            }
        });
    });
}
function getActions(sceneId, adventureUrl) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Action_1["default"].findAll({
                        where: {
                            adventureUrl: adventureUrl,
                            sceneId: sceneId
                        }
                    })];
                case 1: return [2 /*return*/, (_a.sent()).map(function (obj) {
                        return {
                            adventureUrl: obj.adventureUrl,
                            text: obj.text,
                            nextSceneId: obj.nextSceneId,
                            sceneId: obj.sceneId,
                            id: obj.id
                        };
                    })];
            }
        });
    });
}
function getScene(sceneId, adventureUrl) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var maxTextPositionId, minTextPositionId, sceneData, textPosition, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    maxTextPositionId = 4;
                    minTextPositionId = 1;
                    return [4 /*yield*/, Scene_1["default"].findOne({
                            where: {
                                sceneId: sceneId,
                                adventureUrl: adventureUrl
                            }
                        })];
                case 1:
                    sceneData = _c.sent();
                    if (sceneData === null) {
                        return [2 /*return*/, undefined];
                    }
                    if (sceneData.textPositionId === undefined ||
                        sceneData.textPositionId > maxTextPositionId ||
                        sceneData.textPositionId < minTextPositionId) {
                        sceneData.textPositionId = 1;
                    }
                    return [4 /*yield*/, TextPosition_1["default"].findOne({
                            where: {
                                id: sceneData === null || sceneData === void 0 ? void 0 : sceneData.textPositionId
                            }
                        })];
                case 2:
                    textPosition = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.textPosition;
                    _b = {
                        adventureUrl: sceneData.adventureUrl,
                        text: sceneData.text,
                        imageName: sceneData.imageName,
                        sceneId: sceneData.sceneId,
                        textPosition: (textPosition === undefined) ? config_1["default"].get('defaultTextPosition') : textPosition
                    };
                    return [4 /*yield*/, getAchievements(sceneData.sceneId, sceneData.adventureUrl)];
                case 3:
                    _b.achievements = _c.sent();
                    return [4 /*yield*/, getActions(sceneData.sceneId, sceneData.adventureUrl)];
                case 4: return [2 /*return*/, (_b.actions = _c.sent(),
                        _b.firstSceneId = sceneData.firstSceneId,
                        _b)];
            }
        });
    });
}
exports.getScene = getScene;
function getAdventureName(adventureUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var adventure;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Adventure_1["default"].findOne({
                        where: {
                            urlText: adventureUrl
                        }
                    })];
                case 1:
                    adventure = (_a.sent());
                    return [2 /*return*/, adventure === null ? '' : adventure.name];
            }
        });
    });
}
exports.getAdventureName = getAdventureName;
function getAdventuresCount() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Adventure_1["default"].count()];
        });
    });
}
exports.getAdventuresCount = getAdventuresCount;
