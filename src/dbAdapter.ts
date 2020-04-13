import {
    Sequelize,
    SequelizeOptions
} from 'sequelize-typescript';

import Achievement from './models/Achievement'
import Scene from "./models/Scene";
import TextPosition from "./models/TextPosition";
import HashTag from "./models/HashTag";
import Action from "./models/Action";
import Adventure from "./models/Adventure";
import AdventureToHashTag from "./models/AdventureToHashTag";
import SceneToAchievements from "./models/SceneToAchievement"
import {Op} from "sequelize";
import SceneToAchievement from "./models/SceneToAchievement";
import bdKeys from "./bdKeys.json"
import HashTagView from "./models/HastTagView";
import AdventuresWithFirstScenesView from "./models/AdventuresView";
import AdventuresView from "./models/AdventuresView";
import config from "config";

export interface IAdventure {
    id: number;
    imageName?: string;
    description?: string;
    name: string;
    urlText: string;
    hashTags?: IHashTag[];
}

export interface IHashTag {
    textRu: string;
    textEn: string;
}

interface IHashTagWithAdventureId extends IHashTag{
    adventureId: number;
}

export interface IScene {
    sceneId: number;
    adventureUrl: string;
    text?: string;
    imageName?: string;
    textPosition: string;
    achievements: IAchievement[];
    actions:  IAction[];
    firstSceneId: number;
}

export interface IAchievement {
    id: number;
    text: string;
    imageName: string;
}

export interface IAction {
    adventureUrl: string;
    id: number;
    sceneId: number;
    nextSceneId: number;
    text: string;
}

export function initDb(): void {
    const sequelizeOptions: SequelizeOptions = bdKeys;
    sequelizeOptions.dialect = 'postgres';
    sequelizeOptions.models = [
        Achievement,
        Scene,
        TextPosition,
        HashTag,
        Action,
        Adventure,
        AdventureToHashTag,
        SceneToAchievements,
        HashTagView,
        AdventuresWithFirstScenesView
    ];
    new Sequelize(sequelizeOptions);
}

function addDefaultImageToAdventures(adventures: IAdventure[]): IAdventure[] {
    adventures.forEach(adveture => {
        if (adveture.imageName === null) {
            adveture.imageName = config.get('defaultAdventureImage');
        }
    });

    return adventures;
}

export async function getHashTagEnTextFromBd(textRu: string): Promise<string> {
    const hashTag = await HashTag.findOne({
        where: {
            textRu: textRu
        }
    });

    return hashTag === null ? '' : hashTag.textEn;
}

export async function getHashTagByEnText(hashTagTextEn: string): Promise<IHashTag> {
    const hashTag = await HashTag.findOne({
        where: {
            textEn: hashTagTextEn
        }
    });

    if (hashTag == null) {
        return {
            textEn: '',
            textRu: ''
        };
    }

    return {
        textRu: hashTag.textRu,
        textEn: hashTag.textEn
    }
}

async function getHashTagsFromManyAdventures(adventureIds: number[]): Promise<IHashTagWithAdventureId[]> {
    return (await HashTagView.findAll({
        where: {
            adventureId: {
                [Op.or]: adventureIds
            }
        }
    })).map(hashTagObject => {
        return {
            textRu: hashTagObject.textRu,
            textEn: hashTagObject.textEn,
            adventureId: hashTagObject.adventureId
        }
    });
}

export async function getAdventuresIdsByHashTags(limit: number,
                                                 offset: number,
                                                 hashTagTextEn: string | undefined): Promise<number[]> {
    if (hashTagTextEn !== undefined) {
        return (await HashTagView.findAll({
            limit,
            offset,
            where: {
                textEn: hashTagTextEn,
            }
        })).map(hashTagObject => hashTagObject.adventureId);
    }

    return (await AdventuresView.findAll({
        limit,
        offset
    })).map(adventureObject => adventureObject.id);
}

export async function getAdventures(adventuresIds?: number[]): Promise<IAdventure[]> {
    let searchOptions = {};
    if (adventuresIds !== undefined) {
        searchOptions = {
            id: {
                [Op.or]: adventuresIds
            }
        }
    }

    const adventures: IAdventure[] = (await AdventuresWithFirstScenesView.findAll({
        where: searchOptions
    })).map((adventure: Adventure) => {
        return {
            id: adventure.id,
            imageName: adventure.imageName,
            description: adventure.description,
            name: adventure.name,
            urlText: adventure.urlText,
            hashTags: []
        }
    });

    const loadedAdventuresIds: number[] = adventures.map(adventure => adventure.id);
    const hashTags: IHashTagWithAdventureId[] = await getHashTagsFromManyAdventures(loadedAdventuresIds);

    hashTags.forEach(hashTag => {
        const adventure = adventures.find(x => x.id === hashTag.adventureId);
        adventure?.hashTags?.push(hashTag);
    });

    addDefaultImageToAdventures(adventures);

    return adventures;
}

export async function getAdventuresByHashTag(hashTagTextEn: string): Promise<IAdventure[]> {
    const adventureIds: number[] = (await HashTagView.findAll({
        where: {
            textEn: hashTagTextEn
        }
    })).map(hashTagObject => hashTagObject.adventureId);

    return  await getAdventures(adventureIds);
}

async function getAchievements(sceneId: number, adventureUrl: string): Promise<IAchievement[]> {
    const achievementsIds: number[] = (await SceneToAchievement.findAll({
        where: {
            adventureUrl,
            sceneId
        }
    })).map(data => data.achievementId);

    if (achievementsIds.length == 0) {
        return [];
    }

    return (await Achievement.findAll({
        where: {
            id: {
                [Op.or]: achievementsIds
            }
        }
    })).map((achievementObject: Achievement) => {
        return {
            text: achievementObject.text,
            imageName: achievementObject.imageName,
            id: achievementObject.id
        }
    });

}

async function getActions(sceneId: number, adventureUrl: string): Promise<IAction[]> {
    return (await Action.findAll({
        where: {
            adventureUrl,
            sceneId: sceneId
        }
    })).map(obj => {
        return {
            adventureUrl: obj.adventureUrl,
            text: obj.text,
            nextSceneId: obj.nextSceneId,
            sceneId: obj.sceneId,
            id: obj.id
        }
    });
}

export async function getScene(sceneId: number, adventureUrl: string): Promise<IScene | undefined> {
    const maxTextPositionId = 4;
    const minTextPositionId = 1;

    const sceneData = await Scene.findOne({
        where: {
            sceneId,
            adventureUrl
        }
    });
    if (sceneData === null) {
        return undefined;
    }
    if (sceneData.textPositionId === undefined ||
        sceneData.textPositionId > maxTextPositionId ||
        sceneData.textPositionId < minTextPositionId) {
        sceneData.textPositionId = 1;
    }

    const textPosition: string | undefined = (await TextPosition.findOne({
        where: {
            id: sceneData?.textPositionId
        }
    }))?.textPosition;

    return  {
        adventureUrl: sceneData.adventureUrl,
        text: sceneData.text,
        imageName: sceneData.imageName,
        sceneId: sceneData.sceneId,
        textPosition: (textPosition === undefined) ? config.get('defaultTextPosition') : textPosition,
        achievements: await getAchievements(sceneData.sceneId, sceneData.adventureUrl),
        actions: await getActions(sceneData.sceneId, sceneData.adventureUrl),
        firstSceneId: sceneData.firstSceneId
    };
}

export async function getAdventureName(adventureUrl: string): Promise<string> {
    const adventure: IAdventure | null = (await Adventure.findOne({
        where: {
            urlText: adventureUrl
        }
    }));

    return adventure === null ? '' : adventure.name;
}

export async function getAdventuresCount(): Promise<number> {
    return Adventure.count();
}
