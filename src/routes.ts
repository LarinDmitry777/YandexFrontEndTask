import {Application} from 'express';

import {error404} from './controllers/errors';
import {listAdventures} from "./controllers/adventureController";
import {listAdventuresByHashTag} from "./controllers/hashTagsController";
import {renderScene} from "./controllers/sceneController";

export default (app: Application): void => {
    app.get('/', listAdventures);

    app.get('/hashtags/:hashTagTextEn', listAdventuresByHashTag);
    app.get('/scenes/:sceneId', renderScene);

    app.all('*', error404);
}