declare namespace Express {
    interface Request {
        locals: {
            lang: string;
            meta?: {
                charset: string;
                description: string;
            };
            title?: string;
            staticBasePath?: string;
        };
    }
}
