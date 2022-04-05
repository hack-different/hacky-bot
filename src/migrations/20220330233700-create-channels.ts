import type Sequelize from "sequelize";

export async function up(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
    await qi.createTable('channels',
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
            channelName: {
                type: s.DataTypes.STRING,
                allowNull: false
            },
            discordId: {
                type: s.DataTypes.BIGINT,
                allowNull: false,
                unique: true
            },
            isIgnored: {
                type: s.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isArchived: {
                type: s.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        })
}

export async function down(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
    await qi.dropTable('channels')
}
