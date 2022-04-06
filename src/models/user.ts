import {Column, HasMany, Model, Table} from "sequelize-typescript";
import ModerationEvent from "./moderation_event";

@Table({tableName: 'users'})
export default class User extends Model<User> {
    @Column
    discordId!: number

    @Column
    discordTag!: string

    @Column
    discordUsername!: string

    @Column
    githubUsername!: string

    @Column
    twitterUsername!: string

    @Column
    isAdmin!: boolean

    @Column
    isLegit!: boolean

    @Column
    isModerator!: boolean

    @HasMany(() => ModerationEvent, 'subjectId')
    moderationEvents!: ModerationEvent[]
}