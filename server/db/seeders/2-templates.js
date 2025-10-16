'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Templates', [
      {
        title: 'Утренняя зарядка',
        description: '15 минут упражнений каждый день',
        frequency: 'daily',
        difficulty: 'easy',
        popularity: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Чтение книг', 
        description: '30 минут чтения в день',
        frequency: 'daily',
        difficulty: 'medium',
        popularity: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Экономия денег',
        description: 'Откладывать 10% от дохода',
        frequency: 'monthly', 
        difficulty: 'hard',
        popularity: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Медитация',
        description: '10 минут медитации утром',
        frequency: 'daily',
        difficulty: 'medium', 
        popularity: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Templates', null, {});
  }
};