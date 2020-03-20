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

export function addDefaultImageToAdventure(adventures: IAdventure[]): IAdventure[] {
    adventures.forEach(adveture => {
        if (adveture.imageName === null) {
            adveture.imageName = 'advent_default.png';
        }
    });

    return adventures;
}

export async function listAdventures(req: Request, res: Response): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const adventures: IAdventureWithHashTags[] = (await getAdventuresWithHashTags()).filter(
            adventure => adventure.firstSceneId !== null
        );

        addDefaultImageToAdventure(adventures);

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title,
            adventures
        };

        res.render('index', data)
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
