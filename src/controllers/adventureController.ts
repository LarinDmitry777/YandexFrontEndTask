import {NextFunction, Request, Response} from 'express';
import {getAdventuresWithHashTags, IAdventure, isAdventureHasFirstScene} from "../dbAdapter";
import RequestLocals = Express.RequestLocals;


interface PageData extends RequestLocals{
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

export async function listAdventures(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const adventures = await getAdventuresWithHashTags();

        const adventuresWithFirstScene: IAdventure[] = [];

        for (const adventure of adventures) {
            if (await isAdventureHasFirstScene(adventure.urlText)) {
                adventuresWithFirstScene.push(adventure);
            }
        }

        addDefaultImageToAdventure(adventuresWithFirstScene);

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title,
            adventures: adventuresWithFirstScene
        };

        res.render('index', data)
    } catch (e) {
        next(e)
    }
}
