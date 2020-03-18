import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class Scene extends Model<Scene>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

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