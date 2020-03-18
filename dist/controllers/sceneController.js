"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbAdapter_1 = require("../dbAdapter");
const errors_1 = require("./errors");
async function renderScene(req, res) {
    const { meta, lang, staticBasePath, title } = req.locals;
    const sceneId = Number.parseInt(req.params.sceneId);
    const scene = await dbAdapter_1.getSceneById(sceneId);
    if (scene === undefined) {
        errors_1.error404(req, res);
        return;
    }
    const data = {
        meta,
        lang,
        staticBasePath,
        title,
        scene
    };
    console.log(scene);
    res.render('scene', data);
}
exports.renderScene = renderScene;
//# sourceMappingURL=sceneController.js.map