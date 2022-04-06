import {Sequelize} from "sequelize";

export const database_url = process.env["DATABASE_URL"] || "postgresql://hacky:hacky@localhost/hacky"

export default class Store {
    relationalStore = new Sequelize('postgres://user:pass@example.com:5432/dbname');

    async migrate() {

    }
}