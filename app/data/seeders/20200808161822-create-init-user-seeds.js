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
    return queryInterface.bulkInsert('users', [{
      id: 1,
      email: 'superadmin@rotinsulu.com',
      password: hashHelper.hashSync('Admin@123456'),
      userFullName: 'Superadmin',
      isActivated: true,
      createdBy: 'system',
      updatedBy: 'system'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', [{
      id: 1
    }], {});
  }
};
