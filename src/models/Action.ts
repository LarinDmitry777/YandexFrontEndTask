import {AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import Scene from "./Scene";

@Table
export default class Action extends Model<Action> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Scene)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    sceneId!: number;

    @ForeignKey(() => Scene)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    nextSceneId!: number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    text!: string
}