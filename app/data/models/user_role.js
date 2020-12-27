'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_role.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    created_by: DataTypes.STRING(50),
    updated_by: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'user_role',
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return user_role;
};