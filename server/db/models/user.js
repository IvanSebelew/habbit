'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Habit, {
        foreignKey: 'userId',
        as: 'habits',
        onDelete: 'CASCADE'
      })
    }

  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
    type: DataTypes.STRING, 
    allowNull: false,
    defaultValue: 'user'
  }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};