import {Application, Request, Response} from 'express';

import {processError404, processError500} from './controllers/errors';
import {listAdventures} from "./controllers/adventureController";
import {listAdventuresByHashTag} from "./controllers/hashTagsController";
import {renderScene} from "./controllers/sceneController";

// function test(req: Request, res: Response): void {
//     const questName = req.params.questName;
//     const sceneId = req.params.sceneId;
//     res.send(`${questName} ${sceneId}`);
// }

export default (app: Application): void => {
    app.get('/', listAdventures);

    app.get('/quests/:questName/:sceneId', renderScene);

    app.get('/hashtags/:hashTagTextEn', listAdventuresByHashTag);

    app.use(processError404);
    app.use(processError500);

    app.all('*', (_req: Request, res: Response) => {
        res.sendStatus(404);
    });
}
