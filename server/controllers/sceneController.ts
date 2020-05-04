import {NextFunction, Request, Response} from 'express';
import {getScene, IAchievement, IAction, IScene} from "../dbAdapter";
import {PageError} from "./errors";
import config from "config";


interface SceneApiData {
    sceneId: number;
    adventureUrl: string;
    text?: string;
    imageName?: string;
    textPosition: string;
    achievements: IAchievement[];
    actions:  IAction[];
    firstSceneId: number;
    staticBasePath: string;
}

export async function getSceneApiData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const staticBasePath: string = config.get('staticBasePath');

        const questUrl: string = req.params.questName;
        const sceneId: number = Number.parseInt(req.params.sceneId);

        const scene: IScene | undefined = await getScene(sceneId, questUrl);

        if (scene === undefined) {
            throw new PageError('404');
        }

        const data: SceneApiData = {
            staticBasePath,
            achievements: scene.achievements,
            actions: scene.actions,
            adventureUrl: scene.adventureUrl,
            firstSceneId: scene.firstSceneId,
            imageName: scene.imageName,
            sceneId: scene.sceneId,
            text: scene.text,
            textPosition: scene.textPosition
        };

        res.json(data);
    } catch (e) {
        if (e instanceof PageError){
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}
