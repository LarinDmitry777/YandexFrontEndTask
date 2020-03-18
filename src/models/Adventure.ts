import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";

import Scene from "./Scene";

@Table
export default class Adventure extends Model<Adventure>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(true)
    @Column(DataType.STRING(50))
    imageName!: string;

    @Column(DataType.STRING(400))
    description!: string;

    @Unique
    @Column(DataType.STRING(50))
    name!: string;

    @ForeignKey(() => Scene)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    firstSceneId!: number;

}