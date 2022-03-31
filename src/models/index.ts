import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database.json')[env]

function getSequelize() : Sequelize {
  if (config.use_env_variable) {
    const uri = process.env[config.use_env_variable] as string
    return new Sequelize(uri, config)
  } else {
    return new Sequelize(config.database, config.username, config.password, config)
  }
}

function isModelFile(file: string) : boolean {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
}

function configureModelFile(file: string) : void {
  const model = require(path.join(__dirname, file))(sequelize, DataTypes)
  db[model.name] = model
}

export const sequelize = getSequelize()
export { Sequelize }
const db: any = {}

fs.readdirSync(__dirname).filter(isModelFile).forEach(configureModelFile)

Object.keys(db).map(modelName => db[modelName].associate).filter(a => a !== null).forEach(a => a(db))

export { db }
export default db
