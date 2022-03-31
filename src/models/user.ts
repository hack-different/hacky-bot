import {Model} from 'sequelize'
import {Column, CreatedAt, DeletedAt, IsUUID, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

@Table({tableName: 'users'})
export default class User extends Model {
    @Column
    @PrimaryKey
    @IsUUID(4)
    id!: string

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date

    @DeletedAt
    deletedAt!: Date

    @Column
    discordId!: number

    @Column
    discordTag!: string

    @Column
    discordUsername!: string

    @Column
    githubUsername!: string
}