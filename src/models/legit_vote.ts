import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user";

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