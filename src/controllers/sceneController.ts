import {NextFunction, Request, Response} from 'express';
import {getAdventureName, getSceneByIdAndUrl, IScene} from "../dbAdapter";
import {PageError} from "./errors";
import RequestLocals = Express.RequestLocals;


interface PageData extends RequestLocals{
    scene: IScene;
}

export async function renderScene(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const questUrl: string = req.params.questName;
        const sceneId: number = Number.parseInt(req.params.sceneId);

        const scene: IScene | undefined = await getSceneByIdAndUrl(sceneId, questUrl);

        if (scene === undefined) {
            throw new PageError('404');
        }

        const adventureName: string = await getAdventureName(questUrl);
        const newTitle = `${adventureName} | ${title}`;

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title: newTitle,
            scene
        };

        res.render('scene', data)
    } catch (e) {
        if (e instanceof PageError){
            next(e);
        } else {
            next(new PageError('500'));
        }
    }
}
