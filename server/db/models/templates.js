'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Templates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Categories, {
        through: 'templatesCategories',
        foreignKey: 'templateId',
        as: 'categories'
      })
    }
  }
  Templates.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    frequency: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    popularity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Templates',
  });
  return Templates;
};