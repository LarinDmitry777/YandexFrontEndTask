"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const config_1 = tslib_1.__importDefault(require("config"));
const express_1 = tslib_1.__importDefault(require("express"));
const hbs_1 = tslib_1.__importDefault(require("hbs"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const common_data_1 = tslib_1.__importDefault(require("./middlewares/common-data"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const dbAdapter_1 = require("./dbAdapter");
const handlebars_1 = require("handlebars");
const app = express_1.default();
const viewsDir = path_1.default.join(__dirname, 'views');
const partialsDir = path_1.default.join(viewsDir, 'partials');
const publicDir = path_1.default.join(__dirname, 'public');
app.set('view engine', 'hbs');
app.set('views', viewsDir);
if (config_1.default.get('debug')) {
    app.use(morgan_1.default('dev'));
}
app.use(express_1.default.static(publicDir));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((err, _req, _res, next) => {
    console.error(err.stack);
    next();
});
app.use(common_data_1.default);
routes_1.default(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.sendStatus(500);
});
hbs_1.default.registerHelper('breaklines', function (text) {
    text = handlebars_1.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new handlebars_1.SafeString(text);
});
hbs_1.default.registerPartials(partialsDir, () => {
    const port = config_1.default.get('port');
    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
dbAdapter_1.initDb();
//# sourceMappingURL=index.js.map