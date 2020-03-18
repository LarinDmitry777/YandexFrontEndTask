import path from 'path';

import bodyParser from 'body-parser';
import config from 'config';
import express, {NextFunction as Next, Request, Response} from 'express';
import hbs from 'hbs';
import morgan from 'morgan';

import commonData from './middlewares/common-data';
import routes from './routes';
import {initDb} from './dbAdapter'
import {SafeString, escapeExpression} from 'handlebars'

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((err: Error, _req: Request, _res: Response, next: Next) => {
    console.error(err.stack);

    next();
});

app.use(commonData);

routes(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

hbs.registerHelper('breaklines', function(text) {
    text = escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new SafeString(text);
});

hbs.registerPartials(partialsDir, () => {
    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});

initDb();
