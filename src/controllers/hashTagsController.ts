import {NextFunction, Request, Response} from 'express';
import {
    getAdventuresByHashTag,
    getHashTagByEnText, IAdventure,
    IAdventureWithHashTags, IHashTag
} from "../dbAdapter";
import {PageError} from "./errors";
import {addDefaultImageToAdventure, filterAdventuresWithFirstScenes} from "./adventureController";
import RequestLocals = Express.RequestLocals;

interface PageData extends RequestLocals{
    adventures: IAdventureWithHashTags[];
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

        const adventures = await getAdventuresByHashTag(hashTagTextEn);

        const adventuresWithFirstScene: IAdventure[] = await filterAdventuresWithFirstScenes(adventures);

        addDefaultImageToAdventure(adventures);

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title,
            adventures: adventuresWithFirstScene,
            hashTag
        };

        res.render('hashTag', data)
    } catch (e) {
        if (e instanceof PageError){
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}
