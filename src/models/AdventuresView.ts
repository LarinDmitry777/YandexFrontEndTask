import {
    AllowNull,
    Column,
    DataType,
    Model, PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: 'AdventuresWithFirstScenesView'
})
export default class AdventuresWithFirstScenesView extends Model<AdventuresWithFirstScenesView>{
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
