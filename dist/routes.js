"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./controllers/errors");
const adventureController_1 = require("./controllers/adventureController");
const hashTagsController_1 = require("./controllers/hashTagsController");
const sceneController_1 = require("./controllers/sceneController");
exports.default = (app) => {
    app.get('/', adventureController_1.listAdventures);
    app.get('/hashtags/:hashTagTextEn', hashTagsController_1.listAdventuresByHashTag);
    app.get('/scenes/:sceneId', sceneController_1.renderScene);
    app.all('*', errors_1.error404);
};
//# sourceMappingURL=routes.js.map