import type Sequelize from "sequelize";

export async function up(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
  await qi.createTable('deleted_messages', {
    id: {
      type: s.DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
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
    sentAt: {
      type: s.DataTypes.TIME,
      allowNull: false
    },
    sender: {
      type: s.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    deleter: {
      type: s.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    channelId: {
      type: s.DataTypes.BIGINT,
      allowNull: false
    },
    message: {
      type: s.DataTypes.TEXT,
      allowNull: false
    }
  })
}

export async function down(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
  await qi.dropTable('deleted_messages')
}
