import {NextFunction, Request, Response} from 'express';
import {
    getHashTagByEnText,
    IHashTag
} from "../dbAdapter";
import {PageError} from "./errors";
import RequestLocals = Express.RequestLocals;

interface PageData extends RequestLocals{
    hashTag: IHashTag;
}

export async function listAdventuresByHashTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const {hashTagTextEn} = req.params;

        const hashTag = await getHashTagByEnText(hashTagTextEn);
        if (hashTag === undefined) {
            throw new PageError('404');
        }

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title,
            hashTag
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
