import {parse} from 'url';

import {Application} from 'express';
import {getSceneApiData} from "./controllers/sceneController";
import {getHashTagEnText, getHashTagRuText, getJsonAdventuresPack} from "./controllers/apiController";
import config from 'config';

export default (app: Application) => {
    app.get('/', (_req, res) => res.renderPage('/list', {staticBasePath: config.get('staticBasePath')}));

    app.get('/api/quests/:questName/:sceneId', getSceneApiData);
    app.get('/quests/:adventureName/:sceneId', (_req, res) =>
        res.renderPage('/scene', {staticBasePath: config.get('staticBasePath')}))

    app.get('/api/adventures', getJsonAdventuresPack);
    app.get('/api/getHashTagEnText/:hashTagRu', getHashTagEnText);
    app.get('/api/getHashTagRuText/:hashTagEn', getHashTagRuText);
    app.get('/hashtags/:pageHashTagEn', (_req, res) => res.renderPage('/list'))

    app.all('*', (req, res) => {
       const handleRequest = req.nextApp.getRequestHandler();
        const parsedUrl = parse(req.url, true);

        return handleRequest(req, res, parsedUrl);
    });
};
