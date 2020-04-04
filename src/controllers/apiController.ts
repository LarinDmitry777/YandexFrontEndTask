import {NextFunction, Request, Response} from "express";
import {getAdventuresCount, getAdventuresWithHashTags, IAdventure, IHashTag} from "../dbAdapter";
import {PageError} from "./errors";
import {addDefaultImageToAdventure, filterAdventuresWithFirstScenes} from "./adventureController";

export interface AdventureApiData {
    id: number;
    name: string;
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    description?: string;
    hashTags: IHashTag[];
    adventuresCount: number;
}

export async function getJsonAdventures(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const staticBasePath: string = req.locals.staticBasePath;
        const adventureNumber: string = req.params.number;

        const adventuresCount = await getAdventuresCount();

        const adventuresIds: number[] | undefined = adventureNumber === undefined
            ? undefined
            : [Number.parseInt(adventureNumber)];

        const adventures = await getAdventuresWithHashTags(adventuresIds);
        const adventuresWithFirstScenes: IAdventure[] = await filterAdventuresWithFirstScenes(adventures);
        addDefaultImageToAdventure(adventuresWithFirstScenes);


        const result: AdventureApiData[] = adventuresWithFirstScenes.map(
            adventure => {
                const hashTags = adventure.hashTags === undefined ? [] : adventure.hashTags;
                return {
                    id: adventure.id,
                    name: adventure.name,
                    adventureUrl: adventure.urlText,
                    staticBasePath,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    imageName: adventure.imageName!,
                    description: adventure.description,
                    hashTags,
                    adventuresCount
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
