"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PageError = /** @class */ (function (_super) {
    __extends(PageError, _super);
    function PageError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PageError;
}(Error));
exports.PageError = PageError;
function processError404(err, _req, res, next) {
    if (err instanceof PageError && err.message === '404') {
        console.error(err);
        res.sendStatus(404);
    }
    else {
        next(err);
    }
}
exports.processError404 = processError404;
function processError500(err, _req, res, next) {
    if (err instanceof PageError && err.message === '500') {
        console.error(err);
        res.sendStatus(500);
    }
    else {
        next(err);
    }
}
exports.processError500 = processError500;
