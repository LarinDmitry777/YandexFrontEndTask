"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
let Scene = class Scene extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Scene.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(400)),
    tslib_1.__metadata("design:type", String)
], Scene.prototype, "text", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], Scene.prototype, "imageName", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.SMALLINT),
    tslib_1.__metadata("design:type", Number)
], Scene.prototype, "textPositionId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Scene.prototype, "firstSceneId", void 0);
Scene = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Scene);
exports.default = Scene;
//# sourceMappingURL=Scene.js.map