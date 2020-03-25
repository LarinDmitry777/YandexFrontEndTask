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

export interface IAdventure {
    id: number;
    imageName?: string;
    description?: string;
    name: string;
    firstSceneId?: number;
}

export interface IHashTag {
    id: number;
    textRu: string;
    textEn: string;
}

export interface IAdventureWithHashTags {
    id: number;
    imageName?: string;
    description?: string;
    name: string;
    firstSceneId?: number;
    hashTags?: IHashTag[];
}

export interface IScene {
    id: number;
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
        SceneToAchievements
    ];
    new Sequelize(sequelizeOptions);
}

async function getHashTags(adventureId: number): Promise<IHashTag[]> {
    const hashTagIds: number[] = (await AdventureToHashTag.findAll({
        attributes: ['hashTagId'],
        where: {'adventureId': adventureId}
    })).map(hashTagObject => hashTagObject.hashTagId);

    if (hashTagIds.length === 0) {
        return [];
    }

    return (await HashTag.findAll({
        where: {
            id: {
                [Op.or]: hashTagIds
            }
        }
    })).map(hashTagObject => {
        return {
            id: hashTagObject.id,
            textEn: hashTagObject.textEn,
            textRu: hashTagObject.textRu
        }
    });
}

async function getAdventures(adventuresIds?: number[]): Promise<IAdventure[]> {
    let searchOptions = {};
    if (adventuresIds !== undefined) {
        searchOptions = {
            id: {
                [Op.or]: adventuresIds
            }
        }
    }

    return (await Adventure.findAll({
        where: searchOptions
    })).map((adventure: Adventure) => {
        return {
            id: adventure.id,
            imageName: adventure.imageName,
            description: adventure.description,
            name: adventure.name,
            firstSceneId: adventure.firstSceneId
        }
    });
}

export async function getAdventuresWithHashTags(adventuresIds?: number[]): Promise<IAdventure[]> {
    const adventures: IAdventureWithHashTags[] = await getAdventures(adventuresIds);

    for (const adventure of adventures) {
        adventure.hashTags = await getHashTags(adventure.id);
    }

    return adventures;
}

export async function getHashTagByEnText(hashTagTextEn: string): Promise<IHashTag | undefined> {
    const hashTagObject = (await HashTag.findOne({
        where: {
            textEn: hashTagTextEn
        }
    }));
    console.log(hashTagObject);
    if (hashTagObject == undefined) {
        return undefined;
    }

    return {
        id: hashTagObject.id,
        textEn: hashTagObject.textEn,
        textRu: hashTagObject.textRu
    }
}

export async function getAdventuresByHashTag(hashTagTextEn: string): Promise<IAdventureWithHashTags[]> {
    const hashTag = await getHashTagByEnText(hashTagTextEn);

    if (hashTag === undefined){
        return [];
    }

    const adventuresIds = (await AdventureToHashTag.findAll({
        where: {
            hashTagId: hashTag.id
        }
    }))?.map(adventure => adventure.adventureId);

    return  await getAdventuresWithHashTags(adventuresIds);
}

async function getAchievements(sceneId: number): Promise<IAchievement[]> {
    const achievementsIds: number[] = (await SceneToAchievement.findAll({
        where: {
            'sceneId': sceneId
        }
    })).map(data => data.achievementId);
    console.log('achievements ids: ', achievementsIds);

    if (achievementsIds.length == 0) {
        return [];
    }

    const result = (await Achievement.findAll({
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
    console.log(result);
    return result;
}

async function getActions(sceneId: number): Promise<IAction[]> {
    return (await Action.findAll({
        where: {
            sceneId: sceneId
        }
    })).map(obj => {
        return {
            text: obj.text,
            nextSceneId: obj.nextSceneId,
            sceneId: obj.sceneId,
            id: obj.id
        }
    });
}

export async function getSceneById(sceneId: number): Promise<IScene | undefined> {
    const maxPositionId = 4;
    const minPositionId = 1;
    const sceneData = await Scene.findOne({
        where: {
            id: sceneId
        }
    });
    if (sceneData === null) {
        return undefined;
    }
    if (sceneData.textPositionId === undefined ||
        sceneData.textPositionId > maxPositionId ||
        sceneData.textPositionId < minPositionId) {
        sceneData.textPositionId = 1;
    }

    const textPosition: string | undefined = (await TextPosition.findOne({
        where: {
            id: sceneData?.textPositionId
        }
    }))?.textPosition;


    return  {
        text: sceneData.text,
        imageName: sceneData.imageName,
        id: sceneData.id,
        textPosition: (textPosition === undefined) ? 'topLeft' : textPosition,
        achievements: await getAchievements(sceneData.id),
        actions: await getActions(sceneData.id),
        firstSceneId: sceneData.firstSceneId
    };
}

