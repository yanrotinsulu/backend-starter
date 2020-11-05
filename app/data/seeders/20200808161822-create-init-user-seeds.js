'use strict';

const hashHelper = require('../../helpers/hashes');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('user', [{
      id: 1,
      username: 'superadmin',
      password: hashHelper.hashSync('Admin@123456'),
      email: 'superadmin@rotinsulu.com',
      full_name: 'Superadmin',
      is_activated: true,
      created_by: 'system',
      updated_by: 'system'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('user', [{
      id: 1
    }], {});
  }
};
