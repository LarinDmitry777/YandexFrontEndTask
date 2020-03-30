import config from 'config';
import {NextFunction as Next, Request, Response} from 'express';

export default (req: Request, _res: Response, next: Next): void => {
    req.locals = {
        lang: 'ru',
        meta: {
            charset: 'utf-8',
            description: 'TellTailGames2'
        },
        title: 'TellTailGames2',
        staticBasePath: config.get('staticBasePath')
    };

    next();
};
