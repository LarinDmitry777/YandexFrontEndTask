"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAdapter_1 = require("../dbAdapter");
async function listAdventures(req, res) {
    const { meta, lang, staticBasePath, title } = req.locals;
    const adventures = (await dbAdapter_1.getAdventuresWithHashTags()).filter(adventure => adventure.firstSceneId !== null);
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
        adventures: adventures
    };
    res.render('index', data);
}
exports.listAdventures = listAdventures;
//# sourceMappingURL=adventureController.js.map