const { Templates, Categories } = require('../../db/models')


class TemplateService {
  // Только получить все шаблоны с категориями
  static async getAllTemplates() {
    try {
      
          const templates = await Templates.findAll({
        include: [{
          model: Categories,
          as: 'categories',
          through: { attributes: [] },
          attributes: ['id', 'name']
        }],
        order: [['popularity', 'DESC']]
      });
      return templates;
    } catch (error) {
      console.error('Error in getAllTemplates:', error);
      throw error;
    }
  }

  // Только создать привычку из шаблона
  static async createHabitFromTemplate(userId, templateId) {
    try {
      const template = await Templates.findByPk(templateId);
      if (!template) throw new Error('Шаблон не найден');

      // Используем ТВОЙ существующий HabitService
      const HabitService = require('./habitService');
      const habit = await HabitService.createHabit(userId, {
        title: template.title,
        frequency: template.frequency
      });

      return habit;
    } catch (error) {
      console.error('Error in createHabitFromTemplate:', error);
      throw error;
    }
  }
}

module.exports = TemplateService;