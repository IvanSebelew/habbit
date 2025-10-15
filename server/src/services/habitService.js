const { Habit, Users } = require('../../db/models');

class HabitService {
  static async getUserHabits(userId) {
    try {
      const habits = await Habit.findAll({
        where: { userId },
        include: [{
          model: Users,
          attributes: ['username'],
          as: 'user'
        }],
        order: [['createdAt', 'DESC']]
      });
      
      return habits.map(habit => ({
        id: habit.id,
        title: habit.title,
        frequency: habit.frequency,
        completed: habit.completed,
        createdAt: habit.createdAt,
        owner: habit.user?.username
      }));
    } catch (error) {
      console.error('Error in getUserHabits:', error);
      throw error;
    }
  }

  // для админа
  static async getAllHabits() {
    try {
      const habits = await Habit.findAll({
        include: [{
          model: Users,
          attributes: ['username'],
          as: 'user'
        }],
        order: [['createdAt', 'DESC']]
      });
      
      return habits.map(habit => ({
        id: habit.id,
        title: habit.title,
        frequency: habit.frequency,
        completed: habit.completed,
        createdAt: habit.createdAt,
        owner: habit.user?.username,
        userId: habit.userId
      }));
    } catch (error) {
      console.error('Error in getAllHabits:', error);
      throw error;
    }
  }

  static async createHabit(userId, { title, frequency = 'daily' }) {
    try {
      if (!title || !title.trim()) {
        throw new Error('Название привычки обязательно');
      }

      const newHabit = await Habit.create({
        userId,
        title: title.trim(),
        frequency,
        completed: false
      });

        const habitWithUser = await Habit.findByPk(newHabit.id, {
        include: [{
          model: Users,
          attributes: ['username'],
          as: 'user'
        }]
      });

      return {
        id: habitWithUser.id,
        title: habitWithUser.title,
        frequency: habitWithUser.frequency,
        completed: habitWithUser.completed,
        createdAt: habitWithUser.createdAt,
        owner: habitWithUser.user?.username
      };
    } catch (error) {
      console.error('Error in createHabit:', error);
      throw error;
    }
  }

  static async updateHabit(habitId, userId, updates) {
    try {
      const habit = await Habit.findOne({
        where: { id: habitId, userId }
      });
      
      if (!habit) throw new Error('Привычка не найдена');
      
      await habit.update(updates);
      
       const updatedHabit = await Habit.findByPk(habitId, {
        include: [{
          model: Users,
          attributes: ['username'],
          as: 'user'
        }]
      });

      return {
        id: updatedHabit.id,
        title: updatedHabit.title,
        frequency: updatedHabit.frequency,
        completed: updatedHabit.completed,
        createdAt: updatedHabit.createdAt,
        owner: updatedHabit.user?.username
      };
    } catch (error) {
      console.error('Error in updateHabit:', error);
      throw error;
    }
  }

  static async deleteHabit(habitId, userId) {
    try {
      const habit = await Habit.findOne({
        where: { id: habitId, userId }
      });
      
      if (!habit) throw new Error('Привычка не найдена');
      
      await habit.destroy();
      return { success: true, message: 'Привычка удалена' };
    } catch (error) {
      console.error('Error in deleteHabit:', error);
      throw error;
    }
  }

  static async toggleHabit(habitId, userId) {
    try {
      const habit = await Habit.findOne({
        where: { id: habitId, userId }
      });
      
      if (!habit) throw new Error('Привычка не найдена');
      
      await habit.update({ completed: !habit.completed });
      
      const updatedHabit = await Habit.findByPk(habitId, {
        include: [{
          model: Users,
          attributes: ['username'],
          as: 'user'
        }]
      });

      return {
        id: updatedHabit.id,
        title: updatedHabit.title,
        frequency: updatedHabit.frequency,
        completed: updatedHabit.completed,
        createdAt: updatedHabit.createdAt,
        owner: updatedHabit.user?.username
      };
    } catch (error) {
      console.error('Error in toggleHabit:', error);
      throw error;
    }
  }
}

module.exports = HabitService;