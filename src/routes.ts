import {Application, Request, Response} from 'express';

import {processError404, processError500} from './controllers/errors';
import {listAdventures} from "./controllers/adventureController";
import {listAdventuresByHashTag} from "./controllers/hashTagsController";
import {renderScene} from "./controllers/sceneController";

export default (app: Application): void => {
    app.get('/', listAdventures);

    app.get('/hashtags/:hashTagTextEn', listAdventuresByHashTag);
    app.get('/scenes/:sceneId', renderScene);

    app.use(processError404);
    app.use(processError500);

    app.all('*', (_req: Request, res: Response) => {
        res.sendStatus(404);
    });
}
