import {AllowNull, Column, DataType, Model, Table} from "sequelize-typescript";

@Table
export default class Scene extends Model<Scene>{
    @Column(DataType.INTEGER)
    sceneId!: number;

    @Column(DataType.STRING)
    adventureUrl!: string;

    @AllowNull(true)
    @Column(DataType.STRING(400))
    text!: string;

    @Column(DataType.STRING(50))
    imageName!: string;

    @Column(DataType.SMALLINT)
    textPositionId!: number;

    @Column(DataType.INTEGER)
    firstSceneId!: number;
}
