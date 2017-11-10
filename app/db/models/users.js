'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    userid: DataTypes.TEXT,
    fname: DataTypes.TEXT,
    lname: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.TEXT,
    lastLogin: DataTypes.DATE,
    email: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    about: DataTypes.TEXT,
    locked: DataTypes.BOOLEAN,
    lockedReason: DataTypes.TEXT,
    photo: DataTypes.BLOB,
    address1: DataTypes.TEXT,
    address2: DataTypes.TEXT,
    address3: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zip: DataTypes.TEXT,
    phone1: DataTypes.TEXT,
    phone2: DataTypes.TEXT,
    phone3: DataTypes.TEXT,
    phone1Type: DataTypes.TEXT,
    phone2Type: DataTypes.TEXT,
    phone3Type: DataTypes.TEXT,
    preferredContactMethod1: DataTypes.TEXT,
    preferredContactMethod2: DataTypes.TEXT,
    accountType: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};