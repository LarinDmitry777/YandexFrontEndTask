"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Scene_1 = tslib_1.__importDefault(require("./Scene"));
let Action = class Action extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Action.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => Scene_1.default),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Action.prototype, "sceneId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => Scene_1.default),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Action.prototype, "nextSceneId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "text", void 0);
Action = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Action);
exports.default = Action;
//# sourceMappingURL=Action.js.map