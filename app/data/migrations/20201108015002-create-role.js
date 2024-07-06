'use strict';
export default def = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try {
        await queryInterface.createTable('role', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(100)
          },
          description: {
            type: Sequelize.STRING(255)
          },
          created_by: {
            allowNull: false,
            type: Sequelize.STRING(50)
          },
          updated_by: {
            allowNull: false,
            type: Sequelize.STRING(50)
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
        await queryInterface.addConstraint('role', {
          fields: ['name'],
          type: 'unique',
          name: 'constraint_unique_role_name'
        }, { transaction: t });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      try{
        await queryInterface.removeConstraint('role','constraint_unique_role_name', { transaction: t });
        await queryInterface.dropTable('role', { transaction: t });
        return Promise.resolve();
      }
      catch(e){
        return Promise.reject(e);
      }
    })
  }
};