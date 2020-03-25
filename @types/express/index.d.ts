declare namespace Express {
    interface Request {
        locals: RequestLocals;
    }

    interface RequestLocals {
        lang: string;
        meta: {
            charset: string;
            description: string;
        };
        title: string;
        staticBasePath?: string;
    }
}


