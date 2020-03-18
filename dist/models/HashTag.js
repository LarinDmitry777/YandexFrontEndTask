"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
let HashTag = class HashTag extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], HashTag.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], HashTag.prototype, "textRu", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], HashTag.prototype, "textEn", void 0);
HashTag = tslib_1.__decorate([
    sequelize_typescript_1.Table
], HashTag);
exports.default = HashTag;
//# sourceMappingURL=HashTag.js.map