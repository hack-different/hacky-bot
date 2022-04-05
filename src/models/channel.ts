import {Model, Column, CreatedAt, DeletedAt, IsUUID, PrimaryKey, Table, UpdatedAt, HasMany} from "sequelize-typescript";
import DeletedMessage from "./deleted_message";
import RedactionEvent from "./redaction_event";

@Table({tableName: 'channels'})
export default class Channel extends Model<Channel> {
    @Column
    name!: string

    @Column
    discordId!: number

    @Column
    channelName!: string

    @Column
    isIgnored!: boolean

    @Column
    isArchived!: boolean

    @HasMany(() => DeletedMessage, 'channelId')
    deletedMessages!: DeletedMessage[]

    @HasMany(() => RedactionEvent, 'channelId')
    redactedMessages!: RedactionEvent[]
}
