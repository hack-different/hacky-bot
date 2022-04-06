import fs from 'fs'
import path from 'path'
import {DataTypes, Model, Sequelize} from 'sequelize'
import getConfig from '../config'

const basename = path.basename(__filename)

function getSequelize(): Sequelize {
    if (config.database.use_env_variable) {
        const uri = process.env[config.database.use_env_variable] as string
        return new Sequelize(uri, config.database)
    } else {
        return new Sequelize(config.database.database, config.database.username, config.database.password, config.database)
    }
}

function isModelFile(file: string): boolean {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
}

function configureModelFile(file: string): void {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
}

export const sequelize = getSequelize()
export {Sequelize}
const db: Record<string, Model> = {}

fs.readdirSync(__dirname).filter(isModelFile).forEach(configureModelFile)

Object.keys(db).map(modelName => db[modelName].associate).filter(a => a !== null).forEach(a => a(db))

export default db
