import {NextFunction, Request, Response} from 'express';
import {getSceneById, IScene} from "../dbAdapter";
import {PageError} from "./errors";
import RequestLocals = Express.RequestLocals;


interface PageData extends RequestLocals{
    scene: IScene;
}

export async function renderScene(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const {meta, lang, staticBasePath, title} = req.locals;

        const sceneId = Number.parseInt(req.params.sceneId);
        const scene: IScene | undefined = await getSceneById(sceneId);

        if (scene === undefined) {
            throw new PageError('404');
        }

        const data: PageData = {
            meta,
            lang,
            staticBasePath,
            title,
            scene
        };

        res.render('scene', data)
    } catch (e) {
        next(e);
    }
}
