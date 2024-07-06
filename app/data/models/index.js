'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, dirname, join } from 'path';
import Sequelize from 'sequelize';

//from https://stackoverflow.com/a/66651120
//import { fileURLToPath, URL } from 'node:url';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const __dirnameForImport = new URL('.', import.meta.url).toString();

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';

import configJson from '../../data/config/config.json' with { type: "json" };;
const config = configJson[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the directory and filter them
const modelFiles = readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));

// Dynamically import each model file
for (const file of modelFiles) {
  const model = await import(join(__dirnameForImport, file));
  const modelInstance = model.default(sequelize, Sequelize.DataTypes);
  db[modelInstance.name] = modelInstance;
}

// Associate models if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/*
readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    //const model = sequelize['import'](join(__dirname, file));
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
