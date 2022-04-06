import type Sequelize from "sequelize";

export async function up(qi: Sequelize.QueryInterface, s: typeof Sequelize): Promise<void> {
    await qi.createTable('users',
        {
            id: {
                type: s.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: s.literal('uuid_generate_v4()')
            },
            createdAt: {
                type: s.DataTypes.TIME,
                allowNull: false
            },
            updatedAt: {
                type: s.DataTypes.TIME,
                allowNull: false
            },
            deletedAt: {
                type: s.DataTypes.TIME,
                defaultValue: null,
                allowNull: true
            },
            discordId: {
                type: s.DataTypes.BIGINT,
                allowNull: false,
                unique: true
            },
            discordTag: {
                type: s.DataTypes.STRING,
                allowNull: false
            },
            discordUsername: {
                type: s.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            githubUsername: {
                type: s.DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            twitterUsername: {
                type: s.DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            isAdmin: {
                type: s.DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            isLegit: {
                type: s.DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            isModerator: {
                type: s.DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        })
}

export async function down(qi: Sequelize.QueryInterface): Promise<void> {
    await qi.dropTable('users')
}
