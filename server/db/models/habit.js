'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'Users'
      })
    }
  }
  Habit.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    frequency: {
      type: DataTypes.ENUM('daily', 'weekly'),
      defaultValue: 'daily'
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Habit',
  });
  return Habit;
};