import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user";

@Table({tableName: 'moderation_events'})
export default class ModerationEvent extends Model<ModerationEvent> {
    @Column
    occurredAt!: Date

    @Column
    @ForeignKey(() => User)
    subjectId!: string

    @BelongsTo(() => User, 'subjectId')
    subject!: User

    @Column
    @ForeignKey(() => User)
    executionerId!: string

    @BelongsTo(() => User, 'executionerId')
    executioner!: User

    @Column
    reason!: string

    @Column
    timeoutSeconds!: number

    @Column
    isBanned!: boolean
}