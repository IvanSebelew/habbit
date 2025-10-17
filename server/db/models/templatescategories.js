'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemplatesCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Categories, Templates }) {
      this.belongsTo(Categories, { foreignKey: 'categoryId' });
      this.belongsTo(Templates, { foreignKey: 'templateId' });
      // define association here
    }
  }
  TemplatesCategories.init({
    templateId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TemplatesCategories',
    tableName: 'TemplatesCategories',
    freezeTableName: true,
  });
  return TemplatesCategories;
};