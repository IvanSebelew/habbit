const db = require('../../db/models');

const Habit = db.Habit;

class HabitService {
 static async getAllHabits() {
    try {
      const habits = await db.Habit.findAll({
        include: [{
          model: db.User,  // Используем db.User
          attributes: ['username'],
          as: 'User'
        }],
        attributes: ['id', 'title', 'frequency', 'completed', 'userId', 'createdAt']
      });
      
      return habits.map(habit => {
        const plainHabit = habit.get({ plain: true });
        return {
          ...plainHabit,
          owner: plainHabit.User?.username
        };
      });
    }  catch (error) {
    console.error('Error in getAllHabits:', error);
    throw error;
  }
}

  // Создание привычки
  static async createHabit(userId, { title, frequency = 'daily' }) {
    try {
      if (!title) throw new Error('Title is required');
      
      const newHabit = await Habit.create({
        userId,
        title,
        frequency,
        completed: false
      });
      
      return {
        id: newHabit.id,
        title: newHabit.title,
        frequency: newHabit.frequency,
        completed: newHabit.completed,
        createdAt: newHabit.createdAt
      };
    } catch (error) {
      console.error('Error in createHabit:', error);
      throw error;
    }
  }

  // Обновление привычки
  static async updateHabit(habitId, userId, updates) {
    try {
      const habit = await Habit.findOne({
        where: { id: habitId, userId }
      });
      
      if (!habit) throw new Error('Habit not found');
      
      await habit.update(updates);
      return habit.get({ plain: true });
    } catch (error) {
      console.error('Error in updateHabit:', error);
      throw error;
    }
  }

  // Удаление привычки
  static async deleteHabit(habitId, userId) {
    try {
      const habit = await Habit.findOne({
        where: { id: habitId, userId }
      });
      
      if (!habit) throw new Error('Habit not found');
      
      await habit.destroy();
      return { success: true };
    } catch (error) {
      console.error('Error in deleteHabit:', error);
      throw error;
    }
  }
}

module.exports = HabitService;