import {Model, BelongsTo, Column, CreatedAt, ForeignKey, IsUUID, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import User from "./user";
import Channel from "./channel";

@Table({tableName: 'legit_votes'})
export default class LegitVote extends Model<LegitVote> {
    @Column
    @ForeignKey(() => User)
    subjectId!: string

    @BelongsTo(() => User, 'subjectId')
    subject!: User

    @Column
    @ForeignKey(() => User)
    voterId!: string

    @BelongsTo(() => User, 'voterId')
    voter!: User

    @Column
    affirm!: boolean
}