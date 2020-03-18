import {AllowNull, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Scene from "./Scene";
import Achievement from "./Achievement";

@Table
export default class SceneToAchievement extends Model<SceneToAchievement>{
    @ForeignKey(() => Scene)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    sceneId!: number;

    @ForeignKey(() => Achievement)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    achievementId!: number;
}
