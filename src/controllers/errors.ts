import {NextFunction, Request, Response} from 'express';

export class PageError extends Error{
}

export function processError404(err: Error, _req: Request, res: Response, next: NextFunction): void {
    if (err instanceof PageError && err.message === '404'){
        res.sendStatus(404);
    }
    next()
}

export function processError500(err: Error, _req: Request, res: Response, next: NextFunction): void {
    if (err instanceof PageError && err.message === '500'){
        res.sendStatus(500);
    }
    next()
}


