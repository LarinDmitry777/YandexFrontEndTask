import {NextFunction, Request, Response} from "express";
import {
    getAdventures,
    getAdventuresIdsByHashTags,
    getHashTagEnTextFromBd, getHashTagRuTextFromBd,
    IHashTag
} from "../dbAdapter";
import {PageError} from "./errors";
import config from "config";

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

export async function getHashTagRuText(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const hashTagEn: string = req.params.hashTagEn;
        const hashTagRu = await getHashTagRuTextFromBd(hashTagEn);

        res.send(hashTagRu);
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
        const staticBasePath: string = config.get('staticBasePath');

        const limit: number = req.query.limit === undefined
            ? config.get('defaultAdventuresInPackCount')
            : Number.parseInt(req.query.limit);
        const skip: number = req.query.skip === undefined
            ? 0
            : Number.parseInt(req.query.skip);
        const hashTagEn: string = req.query.hashtag;

        const adventuresForLoad = await getAdventuresIdsByHashTags(
            limit,
            skip,
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
