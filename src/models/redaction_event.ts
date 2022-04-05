import {Model, BelongsTo, Column, CreatedAt, ForeignKey, IsUUID, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import User from "./user";
import Channel from "./channel";

@Table({tableName: 'redaction_events'})
export default class RedactionEvent extends Model<RedactionEvent> {
    @Column
    occurredAt!: Date

    @Column
    @ForeignKey(() => User)
    senderId!: string

    @BelongsTo(() => User, 'senderId')
    sender!: User

    @Column
    @ForeignKey(() => Channel)
    channelId!: string

    @BelongsTo(() => Channel, 'channelId')
    channel!: Channel

    @Column
    message!: string

    @Column
    triggerCondition!: string
}