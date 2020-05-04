import {Request, Response} from 'express';
import {ParsedUrlQuery} from "querystring";

export default function(_req: Request, res: Response, pageName: string, params?: ParsedUrlQuery): void{
    res.renderPage(pageName, params);
}
