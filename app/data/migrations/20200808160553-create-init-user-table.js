'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try{
        await queryInterface.createTable('user', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          username: {
            allowNull: false,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
          email: {
            allowNull: true,
            type: Sequelize.STRING
          },
          full_name: {
            allowNull: true,
            type: Sequelize.STRING
          },
          is_activated: {
            defaultValue: false,
            type: Sequelize.BOOLEAN
          },
          is_locked: {
            defaultValue: false,
            type: Sequelize.BOOLEAN
          },
          created_by: {
            allowNull: false,
            type: Sequelize.STRING
          },
          updated_by: {
            allowNull: false,
            type: Sequelize.STRING
          },
          created_at: {
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
            type: Sequelize.DATE
          },
          updated_at: {
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
            type: Sequelize.DATE
          }
        }, { transaction: t });
        await queryInterface.addConstraint('user', {
          fields: ['username'],
          type: 'unique',
          name: 'constraint_unique_user_username'
        }, { transaction: t });
        return Promise.resolve();
      }
      catch(e){
        return Promise.reject(e);
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t =>{
      try{
        await queryInterface.removeConstraint('user','constraint_unique_user_username', { transaction: t });
        await queryInterface.dropTable('user', { transaction: t });
        return Promise.resolve();
      }
      catch(e){
        return Promise.reject(e);
      }
    })
  }
};