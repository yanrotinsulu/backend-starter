'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('role', [{
      id: 1,
      name: 'superadmin',
      description: 'this role can do anything on system',
      created_by: 'seed',
      updated_by: 'seed'
    },{
      id: 2,
      name: 'user',
      description: 'this role is for general user',
      created_by: 'seed',
      updated_by: 'seed'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('role', {id:{[Sequelize.Op.ne]:[1]}}, {});
  }
};
