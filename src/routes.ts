import {Application, Request, Response} from 'express';

import {processError404, processError500} from './controllers/errors';
import {listAdventures} from "./controllers/adventureController";
import {listAdventuresByHashTag} from "./controllers/hashTagsController";
import {renderScene} from "./controllers/sceneController";
import {getJsonAdventures} from "./controllers/apiController";

export default (app: Application): void => {
    app.get('/', listAdventures);

    app.get('/quests/:questName/:sceneId', renderScene);

    app.get('/hashtags/:hashTagTextEn', listAdventuresByHashTag);

    app.get('/api/adventures', getJsonAdventures);
    app.get('/api/adventures/:number', getJsonAdventures);

    app.all('*', processError404);
    app.all('*', processError500);

    app.all('*', (_req: Request, res: Response) => {
        res.sendStatus(404);
    });
}
