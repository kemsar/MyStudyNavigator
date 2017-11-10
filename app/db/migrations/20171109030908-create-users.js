'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.TEXT
      },
      fname: {
        type: Sequelize.TEXT
      },
      lname: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      role: {
        type: Sequelize.TEXT
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.TEXT
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      about: {
        type: Sequelize.TEXT
      },
      locked: {
        type: Sequelize.BOOLEAN
      },
      lockedReason: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.BLOB
      },
      address1: {
        type: Sequelize.TEXT
      },
      address2: {
        type: Sequelize.TEXT
      },
      address3: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      zip: {
        type: Sequelize.TEXT
      },
      phone1: {
        type: Sequelize.TEXT
      },
      phone2: {
        type: Sequelize.TEXT
      },
      phone3: {
        type: Sequelize.TEXT
      },
      phone1Type: {
        type: Sequelize.TEXT
      },
      phone2Type: {
        type: Sequelize.TEXT
      },
      phone3Type: {
        type: Sequelize.TEXT
      },
      preferredContactMethod1: {
        type: Sequelize.TEXT
      },
      preferredContactMethod2: {
        type: Sequelize.TEXT
      },
      accountType: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};