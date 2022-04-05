import type Sequelize from "sequelize";

export async function up(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
  await qi.createTable('moderation_events', {
    id: {
      primaryKey: true,
      type: s.DataTypes.UUID,
      defaultValue: s.literal('uuid_generate_v4()')
    },
    createdAt: {
      type: s.DataTypes.TIME,
      allowNull: false
    },
    occurredAt: {
      type: s.DataTypes.TIME,
      allowNull: true
    },
    subjectId: {
      type: s.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    executionerId: {
      type: s.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    reason: {
      type: s.DataTypes.STRING,
      allowNull: true
    },
    timeoutSeconds: {
      type: s.DataTypes.INTEGER,
      allowNull: true
    },
    isBanned: {
      type: s.DataTypes.BOOLEAN,
      allowNull: false
    }
  })
}

export async function down(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
  await qi.dropTable('moderation_event')
}
