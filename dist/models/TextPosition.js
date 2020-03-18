"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
let TextPosition = class TextPosition extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.SMALLINT),
    tslib_1.__metadata("design:type", Number)
], TextPosition.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(20)),
    tslib_1.__metadata("design:type", String)
], TextPosition.prototype, "textPosition", void 0);
TextPosition = tslib_1.__decorate([
    sequelize_typescript_1.Table
], TextPosition);
exports.default = TextPosition;
//# sourceMappingURL=TextPosition.js.map