import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
export default class HashTag extends Model<HashTag> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Unique
    @Column(DataType.STRING(50))
    textRu!: string;

    @Unique
    @Column(DataType.STRING(50))
    textEn!: string
}