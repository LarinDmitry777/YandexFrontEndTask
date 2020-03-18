"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Achievement_1 = tslib_1.__importDefault(require("./models/Achievement"));
const Scene_1 = tslib_1.__importDefault(require("./models/Scene"));
const TextPosition_1 = tslib_1.__importDefault(require("./models/TextPosition"));
const HashTag_1 = tslib_1.__importDefault(require("./models/HashTag"));
const Action_1 = tslib_1.__importDefault(require("./models/Action"));
const Adventure_1 = tslib_1.__importDefault(require("./models/Adventure"));
const AdventureToHashTag_1 = tslib_1.__importDefault(require("./models/AdventureToHashTag"));
const SceneToAchievement_1 = tslib_1.__importDefault(require("./models/SceneToAchievement"));
const sequelize_1 = require("sequelize");
const SceneToAchievement_2 = tslib_1.__importDefault(require("./models/SceneToAchievement"));
function initDb() {
    const sequelizeOptions = {
        host: 'drona.db.elephantsql.com',
        port: 5432,
        username: 'ztcxcfke',
        password: 'Ayn-d22g6DpPskGc_yekOQlf36p2Cqas',
        database: 'ztcxcfke',
        dialect: 'postgres',
        models: [Achievement_1.default, Scene_1.default, TextPosition_1.default, HashTag_1.default, Action_1.default, Adventure_1.default, AdventureToHashTag_1.default, SceneToAchievement_1.default]
    };
    new sequelize_typescript_1.Sequelize(sequelizeOptions);
}
exports.initDb = initDb;
async function getHashTags(adventureId) {
    const hashTagIds = (await AdventureToHashTag_1.default.findAll({
        attributes: ['hashTagId'],
        where: { 'adventureId': adventureId }
    })).map(hashTagObject => hashTagObject.hashTagId);
    if (hashTagIds.length === 0) {
        return [];
    }
    return (await HashTag_1.default.findAll({
        where: {
            id: {
                [sequelize_1.Op.or]: hashTagIds
            }
        }
    })).map(hashTagObject => {
        return {
            id: hashTagObject.id,
            textEn: hashTagObject.textEn,
            textRu: hashTagObject.textRu
        };
    });
}
async function getAdventures(adventuresIds) {
    let searchOptions = {};
    if (adventuresIds !== undefined) {
        searchOptions = {
            id: {
                [sequelize_1.Op.or]: adventuresIds
            }
        };
    }
    return (await Adventure_1.default.findAll({
        where: searchOptions
    })).map((adventure) => {
        return {
            id: adventure.id,
            imageName: adventure.imageName,
            description: adventure.description,
            name: adventure.name,
            firstSceneId: adventure.firstSceneId
        };
    });
}
async function getAdventuresWithHashTags(adventuresIds) {
    const adventures = await getAdventures(adventuresIds);
    for (const adventure of adventures) {
        adventure.hashTags = await getHashTags(adventure.id);
    }
    return adventures;
}
exports.getAdventuresWithHashTags = getAdventuresWithHashTags;
async function getHashTagByEnText(hashTagTextEn) {
    const hashTagObject = (await HashTag_1.default.findOne({
        where: {
            textEn: hashTagTextEn
        }
    }));
    console.log(hashTagObject);
    if (hashTagObject == undefined) {
        return undefined;
    }
    return {
        id: hashTagObject.id,
        textEn: hashTagObject.textEn,
        textRu: hashTagObject.textRu
    };
}
exports.getHashTagByEnText = getHashTagByEnText;
async function getAdventuresByHashTag(hashTagTextEn) {
    var _a;
    const hashTag = await getHashTagByEnText(hashTagTextEn);
    if (hashTag === undefined) {
        return [];
    }
    const adventuresIds = (_a = (await AdventureToHashTag_1.default.findAll({
        where: {
            hashTagId: hashTag.id
        }
    }))) === null || _a === void 0 ? void 0 : _a.map(adventure => adventure.adventureId);
    return await getAdventuresWithHashTags(adventuresIds);
}
exports.getAdventuresByHashTag = getAdventuresByHashTag;
async function getAchievements(sceneId) {
    const achievementsIds = (await SceneToAchievement_2.default.findAll({
        where: {
            'sceneId': sceneId
        }
    })).map(data => data.achievementId);
    console.log('achievements ids: ', achievementsIds);
    if (achievementsIds.length == 0) {
        return [];
    }
    const result = (await Achievement_1.default.findAll({
        where: {
            id: {
                [sequelize_1.Op.or]: achievementsIds
            }
        }
    })).map((achievementObject) => {
        return {
            text: achievementObject.text,
            imageName: achievementObject.imageName,
            id: achievementObject.id
        };
    });
    console.log(result);
    return result;
}
async function getActions(sceneId) {
    return (await Action_1.default.findAll({
        where: {
            sceneId: sceneId
        }
    })).map(obj => {
        return {
            text: obj.text,
            nextSceneId: obj.nextSceneId,
            sceneId: obj.sceneId,
            id: obj.id
        };
    });
}
async function getSceneById(sceneId) {
    var _a;
    const sceneData = await Scene_1.default.findOne({
        where: {
            id: sceneId
        }
    });
    if (sceneData === null) {
        return undefined;
    }
    if (sceneData.textPositionId === undefined || sceneData.textPositionId > 9 || sceneData.textPositionId < 1) {
        sceneData.textPositionId = 1;
    }
    const textPosition = (_a = (await TextPosition_1.default.findOne({
        where: {
            id: sceneData === null || sceneData === void 0 ? void 0 : sceneData.textPositionId
        }
    }))) === null || _a === void 0 ? void 0 : _a.textPosition;
    return {
        text: sceneData.text,
        imageName: sceneData.imageName,
        id: sceneData.id,
        textPosition: (textPosition === undefined) ? 'topLeft' : textPosition,
        achievements: await getAchievements(sceneData.id),
        actions: await getActions(sceneData.id),
        firstSceneId: sceneData.firstSceneId
    };
}
exports.getSceneById = getSceneById;
//# sourceMappingURL=dbAdapter.js.map