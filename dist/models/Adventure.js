"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Scene_1 = tslib_1.__importDefault(require("./Scene"));
let Adventure = class Adventure extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Adventure.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], Adventure.prototype, "imageName", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(400)),
    tslib_1.__metadata("design:type", String)
], Adventure.prototype, "description", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], Adventure.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => Scene_1.default),
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Adventure.prototype, "firstSceneId", void 0);
Adventure = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Adventure);
exports.default = Adventure;
//# sourceMappingURL=Adventure.js.map