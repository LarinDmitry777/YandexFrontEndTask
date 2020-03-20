import {Request, Response} from 'express';
import {
    getAdventuresByHashTag,
    getHashTagByEnText,
    IAdventureWithHashTags, IHashTag
} from "../dbAdapter";
import {error404} from "./errors";
import {addDefaultImageToAdventure} from "./adventureController";

interface PageData {
    lang?: string;
    meta?: {
        charset: string;
        description: string;
    };
    title?: string;
    staticBasePath?: string;
    adventures: IAdventureWithHashTags[];
    hashTag: IHashTag;
}

export async function listAdventuresByHashTag(req: Request, res: Response): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const {hashTagTextEn} = req.params;

        const hashTag = await getHashTagByEnText(hashTagTextEn);
        if (hashTag === undefined) {
            error404(req, res);
            return;
        }

        const adventures = await getAdventuresByHashTag(hashTagTextEn);

        addDefaultImageToAdventure(adventures);

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title,
            adventures: adventures,
            hashTag: hashTag
        };

        res.render('hashTag', data)
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
