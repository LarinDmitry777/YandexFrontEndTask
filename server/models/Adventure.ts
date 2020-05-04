import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export default class Adventure extends Model<Adventure>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Unique
    @Column(DataType.STRING(50))
    urlText!: string;

    @AllowNull(true)
    @Column(DataType.STRING(50))
    imageName!: string;

    @Column(DataType.STRING(400))
    description!: string;

    @Unique
    @Column(DataType.STRING(50))
    name!: string;
}
