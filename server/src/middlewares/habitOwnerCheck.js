const { Habit } = require('../../db/models');

module.exports = async (req, res, next) => {
  try {
    // Проверяем, что пользователь владеет привычкой
    const habit = await Habit.findOne({
      where: {
        id: req.params.id,
        userId: res.locals.userId // Используем userId из res.locals
      }
    });

    if (!habit) {
      return res.status(403).json({
        error: 'Доступ запрещён: это не ваша привычка или привычка не существует'
      });
    }

    // Сохраняем найденную привычку в запросе для последующего использования
    req.habit = habit;
    next();
  } catch (error) {
    console.error('Ошибка проверки владельца привычки:', error);
    res.status(500).json({ error: 'Ошибка сервера при проверке доступа' });
  }
};