"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Adventure_1 = tslib_1.__importDefault(require("./Adventure"));
const HashTag_1 = tslib_1.__importDefault(require("./HashTag"));
let AdventureToHashTag = class AdventureToHashTag extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => Adventure_1.default),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], AdventureToHashTag.prototype, "adventureId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.ForeignKey(() => HashTag_1.default),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], AdventureToHashTag.prototype, "hashTagId", void 0);
AdventureToHashTag = tslib_1.__decorate([
    sequelize_typescript_1.Table
], AdventureToHashTag);
exports.default = AdventureToHashTag;
//# sourceMappingURL=AdventureToHashTag.js.map