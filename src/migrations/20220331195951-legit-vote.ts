import type Sequelize from "sequelize";

export async function up(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
  await qi.createTable('legit_votes', {
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
    subjectId: {
      type: s.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    voterId: {
      type: s.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    affirm: {
      type: s.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}

export async function down(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
  await qi.dropTable('saved_item')
}