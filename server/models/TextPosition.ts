import {Table, Model, DataType, Column, PrimaryKey} from "sequelize-typescript";

@Table
export default class TextPosition extends Model<TextPosition> {
    @PrimaryKey
    @Column(DataType.SMALLINT)
    id!: number;

    @Column(DataType.STRING(20))
    textPosition!: string
}