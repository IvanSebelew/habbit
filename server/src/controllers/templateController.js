const TemplateService = require('../services/templateService');

class TemplateController {
  // Только получить все шаблоны
  static async getAll(req, res) {
    try {
      const templates = await TemplateService.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка загрузки шаблонов getAllTemplates' });
    }
  }

  // Только создать привычку из шаблона
  static async createHabit(req, res) {
    try {
      const habit = await TemplateService.createHabitFromTemplate(
        res.locals.userId, 
        req.params.templateId
      );
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TemplateController;