import {AllowNull, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Adventure from "./Adventure";
import HashTag from "./HashTag";

@Table
export default class AdventureToHashTag extends Model<AdventureToHashTag>{
    @ForeignKey(() => Adventure)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    adventureId!: number;

    @ForeignKey(() => HashTag)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    hashTagId!: number;
}