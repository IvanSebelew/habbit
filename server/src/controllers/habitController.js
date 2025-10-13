const HabitService = require('../services/habitService');
const { User, Habit } = require('../../db/models'); 

class HabitController {
  static async getAll(req, res) {
    try {
      const habits = await HabitService.getAllHabits();
      res.status(200).json(habits);
    } catch (error) {
    res.status(500).json({ message: 'Ошибка загрузки привычек' });
  }
  }

  static async create(req, res) {
  try {
    const userId = res.locals.userId;
    const { title, frequency = 'daily' } = req.body;

    
    // 2. Проверка существования пользователя
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 3. Создание привычки
    const habit = await Habit.create({
      title,
      frequency,
      userId: res.locals.userId,
      completed: false
    });

    // 4. Форматирование ответа
    const response = {
      id: habit.id,
      title: habit.title,
      frequency: habit.frequency,
      completed: habit.completed,
      createdAt: habit.createdAt
    };

    res.status(201).json(response);
    
  } catch (error) {
    console.error('Create habit error:', error);
    
    // Обработка специфических ошибок
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    res.status(500).json({
      error: error.message || 'Failed to create habit'
    });
  }
}

  static async update(req, res) {
    try {
      
      const { title, frequency, completed } = req.body;

      const updatedHabit = await HabitService.updateHabit(
        req.habit.id,
        req.habit.userId,
        { title, frequency, completed }
      );

      res.status(200).json(updatedHabit);
    } catch (error) {
      console.error('Update habit error:', error);
      res.status(500).json({
        error: error.message || 'Failed to update habit'
      });
    }
  }

  static async complete(req, res) {
    try {
      const userId = res.locals.userId;
      const { id } = req.params;

      const updatedHabit = await HabitService.updateHabit(
        id,
        userId,
        { completed: true }
      );

      res.status(200).json(updatedHabit);
    } catch (error) {
      console.error('Complete habit error:', error);
      res.status(500).json({
        error: error.message || 'Failed to complete habit'
      });
    }
  }

  static async delete(req, res) {
    try {
      const userId = res.locals.userId;
      const { id } = req.params;

      await HabitService.deleteHabit(id, userId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Delete habit error:', error);
      res.status(500).json({
        error: error.message || 'Failed to delete habit'
      });
    }
  }
}

module.exports = HabitController;