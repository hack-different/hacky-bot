import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user";
import Channel from "./channel";

@Table({tableName: 'saved_items'})
export default class SavedItem extends Model<SavedItem> {
    @Column
    @ForeignKey(() => User)
    senderId!: string

    @BelongsTo(() => User, 'senderId')
    sender!: User

    @Column
    @BelongsTo(() => User)
    saverId!: string

    @BelongsTo(() => User, 'saverId')
    saver!: User

    @Column
    @ForeignKey(() => Channel)
    channelId!: number

    @BelongsTo(() => Channel, 'channelId')
    channel!: Channel

    @Column
    message!: string
}