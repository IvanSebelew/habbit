const HabitService = require('../services/habitService');

class HabitController {
    static async getAll(req, res) {
    try {
      const userRole = res.locals.user?.role; 
      let habits;

      if (userRole === 'admin') {
               habits = await HabitService.getAllHabits();
      } else {
                habits = await HabitService.getUserHabits(res.locals.userId);
      }

      res.status(200).json(habits);
    } catch (error) {
      console.error('Get habits error:', error);
      res.status(500).json({ message: 'Ошибка загрузки привычек' });
    }
  }

  static async create(req, res) {
    try {
      const userId = res.locals.userId;
      const { title, frequency = 'daily' } = req.body;

      if (!title || !title.trim()) {
        return res.status(400).json({ message: 'Название привычки обязательно' });
      }

      const habit = await HabitService.createHabit(userId, { title, frequency });
      res.status(201).json(habit);
    } catch (error) {
      console.error('Create habit error:', error);
      res.status(500).json({ message: error.message || 'Ошибка создания привычки' });
    }
  }

  static async update(req, res) {
    try {
      const { title, frequency, completed } = req.body;
      const updates = {};

      if (title !== undefined) updates.title = title;
      if (frequency !== undefined) updates.frequency = frequency;
      if (completed !== undefined) updates.completed = completed;

      const updatedHabit = await HabitService.updateHabit(
        req.params.id,
        res.locals.userId,
        updates
      );

      res.status(200).json(updatedHabit);
    } catch (error) {
      console.error('Update habit error:', error);
      res.status(500).json({ message: error.message || 'Ошибка обновления привычки' });
    }
  }

  static async toggle(req, res) {
    try {
      const updatedHabit = await HabitService.toggleHabit(
        req.params.id,
        res.locals.userId
      );

      res.status(200).json(updatedHabit);
    } catch (error) {
      console.error('Toggle habit error:', error);
      res.status(500).json({ message: error.message || 'Ошибка обновления привычки' });
    }
  }

  static async delete(req, res) {
    try {
      const result = await HabitService.deleteHabit(req.params.id, res.locals.userId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Delete habit error:', error);
      res.status(500).json({ message: error.message || 'Ошибка удаления привычки' });
    }
  }
}

module.exports = HabitController;