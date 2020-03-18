import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export default class Achievement extends Model<Achievement>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(50))
    text!: string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    imageName!: string
}