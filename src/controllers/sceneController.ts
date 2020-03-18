import {Request, Response} from 'express';
import {getSceneById, IScene} from "../dbAdapter";
import {error404} from "./errors";


interface PageData {
    lang?: string;
    meta?: {
        charset: string;
        description: string;
    };
    title?: string;
    staticBasePath?: string;
    scene: IScene;
}

export async function renderScene(req: Request, res: Response): Promise<void> {
    const {meta, lang, staticBasePath, title} = req.locals;

    const sceneId = Number.parseInt(req.params.sceneId);
    const scene: IScene | undefined = await getSceneById(sceneId);

    if (scene === undefined) {
        error404(req, res);
        return;
    }

    const data: PageData = {
        meta,
        lang,
        staticBasePath,
        title,
        scene
    };

    console.log(scene);

    res.render('scene', data)
}
