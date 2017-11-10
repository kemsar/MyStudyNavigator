'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        userid: 'admin',
        fname: 'Kevin',
        lname: 'Sarsen',
        password: 'password',
        role: 'admin',
        email: 'kevinsarsen@gmail.com',
        active: true,
        locked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Person', [{
      userid: 'admin'
    }], {});
  }
};
