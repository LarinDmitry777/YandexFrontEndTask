"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Scene_1 = tslib_1.__importDefault(require("./Scene"));
const Achievement_1 = tslib_1.__importDefault(require("./Achievement"));
let SceneToAchievement = class SceneToAchievement extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => Scene_1.default),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], SceneToAchievement.prototype, "sceneId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => Achievement_1.default),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], SceneToAchievement.prototype, "achievementId", void 0);
SceneToAchievement = tslib_1.__decorate([
    sequelize_typescript_1.Table
], SceneToAchievement);
exports.default = SceneToAchievement;
//# sourceMappingURL=SceneToAchievement.js.map