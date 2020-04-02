import {NextFunction, Request, Response} from 'express';
import {getAdventuresWithHashTags, IAdventure, IAdventureWithHashTags, isAdventureHasFirstScene} from "../dbAdapter";
import RequestLocals = Express.RequestLocals;
import {PageError} from "./errors";


interface PageData extends RequestLocals{
    staticBasePath: string;
    adventures: IAdventureWithHashTags[];
}

export async function filterAdventuresWithFirstScenes(adventures: IAdventure[]): Promise<IAdventure[]>{
    const result: IAdventure[] = [];
    for (const adventure of adventures) {
        if (await isAdventureHasFirstScene(adventure.urlText)) {
            result.push(adventure);
        }
    }

    return result;
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

        const adventuresWithFirstScene: IAdventure[] = await filterAdventuresWithFirstScenes(adventures);

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
        if (e instanceof PageError){
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}

export async function getJsonAdventures(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const staticBasePath: string = req.locals.staticBasePath;

        const adventures = await getAdventuresWithHashTags();
        const adventuresWithFirstScenes: IAdventureWithHashTags[] = await filterAdventuresWithFirstScenes(adventures);
        addDefaultImageToAdventure(adventuresWithFirstScenes);

        const result: AdventureApiData[] = adventuresWithFirstScenes.map(
            adventure => {
                const hashTags = adventure.hashTags === undefined ? [] : adventure.hashTags;
                return {
                    name: adventure.name,
                    adventureUrl: adventure.urlText,
                    staticBasePath,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    imageName: adventure.imageName!,
                    description: adventure.description,
                    hashTags
                }
            }
        );

        res.send(JSON.stringify(result));
    } catch(e) {
        if (e instanceof PageError) {
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}
