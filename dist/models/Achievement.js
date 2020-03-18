"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
let Achievement = class Achievement extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Achievement.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], Achievement.prototype, "text", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(50)),
    tslib_1.__metadata("design:type", String)
], Achievement.prototype, "imageName", void 0);
Achievement = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Achievement);
exports.default = Achievement;
//# sourceMappingURL=Achievement.js.map