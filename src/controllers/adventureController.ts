import {NextFunction, Request, Response} from 'express';
import RequestLocals = Express.RequestLocals;
import {PageError} from "./errors";


interface PageData extends RequestLocals{
    staticBasePath: string;
}

export async function listAdventures(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title
        };

        res.render('index', data)
    } catch (e) {
        if (e instanceof PageError){
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}

