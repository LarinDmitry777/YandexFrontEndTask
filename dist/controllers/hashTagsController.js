"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAdapter_1 = require("../dbAdapter");
const errors_1 = require("./errors");
async function listAdventuresByHashTag(req, res) {
    const { meta, lang, staticBasePath, title } = req.locals;
    const { hashTagTextEn } = req.params;
    const hashTag = await dbAdapter_1.getHashTagByEnText(hashTagTextEn);
    if (hashTag === undefined) {
        errors_1.error404(req, res);
        return;
    }
    const adventures = await dbAdapter_1.getAdventuresByHashTag(hashTagTextEn);
    adventures.forEach(adventure => {
        if (adventure.imageName === null) {
            adventure.imageName = 'advent_default.png';
        }
    });
    const data = {
        meta,
        lang,
        staticBasePath,
        title,
        adventures: adventures,
        hashTag: hashTag
    };
    res.render('hashTag', data);
}
exports.listAdventuresByHashTag = listAdventuresByHashTag;
//# sourceMappingURL=hashTagsController.js.map