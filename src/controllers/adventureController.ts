import {Request, Response} from 'express';
import {getAdventuresWithHashTags, IAdventure, IAdventureWithHashTags} from "../dbAdapter";


interface PageData {
    lang?: string;
    meta?: {
        charset: string;
        description: string;
    };
    title?: string;
    staticBasePath?: string;
    adventures: IAdventure[];
}

export async function listAdventures(req: Request, res: Response): Promise<void> {
    const {meta, lang, staticBasePath, title} = req.locals;

    const adventures: IAdventureWithHashTags[] = (await getAdventuresWithHashTags()).filter(
        adventure => adventure.firstSceneId !== null
    );

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
        adventures: adventures
    };

    res.render('index', data)
}
