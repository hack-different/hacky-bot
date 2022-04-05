import type Sequelize from "sequelize";

export async function up(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
    await qi.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
}

export async function down(qi: Sequelize.QueryInterface, s: typeof Sequelize) : Promise<void> {
    await qi.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";')
}