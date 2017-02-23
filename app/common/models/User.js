// var Sequelize = require('sequelize');

// var User = Sequelize.define('user', {
//   id:       Sequelize.TEXT,
//   name:     Sequelize.TEXT,
//   email:    Sequelize.TEXT,
//   password: Sequelize.TEXT
// });

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    name:     DataTypes.TEXT,
    email:    DataTypes.TEXT,
    password: DataTypes.TEXT,
    createdAt: DataTypes.TEXT,
    updatedAt: DataTypes.TEXT
  }, {
    instanceMethods: {
      countTasks: function() {
        // how to implement this method ?
      }
    }
  });
};