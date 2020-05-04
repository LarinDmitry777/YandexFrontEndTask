import {AllowNull, Column, DataType, Model, Table} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: 'HashTagsView'
})
export default class HashTagView extends Model<HashTagView>{
    @AllowNull(false)
    @Column(DataType.INTEGER)
    adventureId!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    textEn!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    textRu!: string;
}
