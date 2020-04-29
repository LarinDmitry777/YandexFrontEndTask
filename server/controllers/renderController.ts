import {Request, Response} from 'express';

export default function(_req: Request, res: Response, pageName: string): void{
    res.renderPage(pageName);
}
