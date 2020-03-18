import {Request, Response} from 'express';
import {
    getAdventuresByHashTag,
    getHashTagByEnText,
    IAdventureWithHashTags, IHashTag
} from "../dbAdapter";
import {error404} from "./errors";

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
    const {meta, lang, staticBasePath, title} = req.locals;

    const {hashTagTextEn} = req.params;

    const hashTag = await getHashTagByEnText(hashTagTextEn);
    if (hashTag === undefined) {
        error404(req, res);
        return;
    }

    const adventures = await getAdventuresByHashTag(hashTagTextEn);

    adventures.forEach(
        adventure => {
            if (adventure.imageName === null){
                adventure.imageName = 'advent_default.png'
            }
        }
    );

    const data: PageData = {
        meta,
        lang,
        staticBasePath,
        title,
        adventures: adventures,
        hashTag: hashTag
    };

    res.render('hashTag', data)
}
