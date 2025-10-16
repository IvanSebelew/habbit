'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Здоровье', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Спорт', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Продуктивность', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Образование', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Финансы', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Психология', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};