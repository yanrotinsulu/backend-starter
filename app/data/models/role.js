'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role.init({
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(255),
    created_by: DataTypes.STRING(50),
    updated_by: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'role',
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return role;
};