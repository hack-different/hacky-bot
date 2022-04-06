import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user";
import Channel from "./channel";

@Table({tableName: 'deleted_messages'})
export default class DeletedMessage extends Model<DeletedMessage> {
    @Column
    sentAt!: Date

    @Column
    @ForeignKey(() => User)
    senderId!: string

    @BelongsTo(() => User, 'senderId')
    sender!: User

    @Column
    @ForeignKey(() => User)
    deleterId!: string

    @BelongsTo(() => User, 'deleterId')
    deleter!: User

    @Column
    @ForeignKey(() => Channel)
    channelId!: string

    @BelongsTo(() => Channel, 'channelId')
    channel!: Channel

    @Column
    message!: string
}