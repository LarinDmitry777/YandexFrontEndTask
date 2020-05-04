import {parse} from 'url';

import {Application} from 'express';
import {getSceneApiData} from "./controllers/sceneController";
import {getHashTagEnText, getHashTagRuText, getJsonAdventuresPack} from "./controllers/apiController";
import renderController from "./controllers/renderController";

export default (app: Application): void => {
    app.get('/', (req, res) => renderController(req, res, '/list'));
    app.get('/api/quests/:questName/:sceneId', getSceneApiData);
    app.get('/quests/:adventureName/:sceneId', (req, res) => renderController(req, res, '/scene'))

    app.get('/api/adventures', getJsonAdventuresPack);
    app.get('/api/getHashTagEnText/:hashTagRu', getHashTagEnText);
    app.get('/api/getHashTagRuText/:hashTagEn', getHashTagRuText);
    app.get('/hashtags/:pageHashTagEn', (req, res) =>
        renderController(req, res, '/list', { hashTag: req.params.pageHashTagEn}));

    app.all('*', (req, res) => {
       const handleRequest = req.nextApp.getRequestHandler();
        const parsedUrl = parse(req.url, true);

        return handleRequest(req, res, parsedUrl);
    });
};
