'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TemplatesCategories', [
      // Утренняя зарядка → Здоровье, Спорт
      { templateId: 1, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { templateId: 1, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      
      // Чтение книг → Образование
      { templateId: 2, categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      
      // Экономия денег → Финансы
      { templateId: 3, categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      
      // Медитация → Психология, Здоровье
      { templateId: 4, categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
      { templateId: 4, categoryId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TemplatesCategories', null, {});
  }
};