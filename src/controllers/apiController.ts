import {NextFunction, Request, Response} from "express";
import {getAdventures, getAdventuresIdsByHashTags, getHashTagEnTextFromBd, IHashTag} from "../dbAdapter";
import {PageError} from "./errors";

export interface AdventureApiData {
    id: number;
    name: string;
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    description?: string;
    hashTags: IHashTag[];
}

export async function getHashTagEnText(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const hashTagRu: string = req.params.hashTagRu;
        const hashTagEn = await getHashTagEnTextFromBd(hashTagRu);

        res.send(hashTagEn);
    } catch(e) {
        if (e instanceof PageError) {
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}

export async function getJsonAdventuresPack(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const firstAdventureIdInPack: number = Number.parseInt(req.params.firstAdventureInPackId) - 1;
        const hashTagEn: string = req.params.hashTagEn;
        const staticBasePath: string = req.locals.staticBasePath;

        const adventuresInPackCount = 5;

        const adventuresForLoad = await getAdventuresIdsByHashTags(
            adventuresInPackCount,
            firstAdventureIdInPack,
            hashTagEn
        );

        if (adventuresForLoad.length === 0) {
            res.json([]);
            return;
        }

        const adventures = await getAdventures(adventuresForLoad);

        const result: AdventureApiData[] = adventures.map(
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
                    hashTags
                }
            }
        );

        res.json(result);
    } catch(e) {
        if (e instanceof PageError) {
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}
