/* eslint-disable */

import {ParsedUrlQuery} from 'querystring';
import nextjs from 'next';

declare global {
    namespace Express {
        interface Request {
           nextApp: ReturnType<typeof nextjs>;
        }

        interface Response {
           renderPage(pathname: string, query?: ParsedUrlQuery): void;
        }
    }
}
